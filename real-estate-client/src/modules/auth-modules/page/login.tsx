import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLegend } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "../validation-schema/user.validation";
import { EyeIcon, EyeOffIcon, Lock, Mail } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import inputCls from "@/lib/input-class-builder";
import Label from "@/components/ui/custom/reuseable-lable";
import { useLogin } from "@/apis/hooks/auth.hooks";
import type { LoginPayload} from "../types";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginValidation),
  });

  //mutation
  const { mutateAsync: Login, isPending: loginLoading } = useLogin();

  //handlers
  const onSubmit: SubmitHandler<LoginPayload> = async (
    data: LoginPayload,
  ) => {
    try {
      await Login(data);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* ── Card ── */}
      <div className="relative w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-sm px-10 py-12 shadow-2xl">
        {/* ── Header ── */}
        <div className="mb-9">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-secondary mb-3">
            Welcome back
          </p>
          <h1
            className="text-[32px] font-semibold text-primary-foreground leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sign In
          </h1>
          <p className="mt-2 text-sm text-secondary-foreground/50 font-light">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="space-y-6">
            <FieldLegend className="sr-only">Login</FieldLegend>

            {/* Email */}
            <Field>
              <Label>Email</Label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputCls(!!errors.email)}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </Field>

            {/* Password */}
            <Field>
              <div className="flex items-center justify-between mb-2">
                <Label>Password</Label>
                <Button
                  type="button"
                  variant={"link"}
                  className="text-[11px] text-secondary-foreground hover:text-secondary/60 transition-colors tracking-wide"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  autoComplete="current-password"
                  className={inputCls(!!errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </Field>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loginLoading}
              className={[
                "w-full mt-2 py-3.5 rounded-sm text-[11px] font-medium tracking-[0.18em] uppercase",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              ].join(" ")}
            >
              {loginLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </FieldGroup>
        </form>

        <p className="mt-6 text-center text-[13px] text-zinc-500 font-light">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-secondary hover:text-button-hover font-normal transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
