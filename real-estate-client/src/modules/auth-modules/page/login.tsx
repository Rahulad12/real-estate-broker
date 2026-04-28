import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLegend } from "@/components/shared/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "../validation-schema/user.validation";
import { EyeIcon, EyeOffIcon, Loader2, Lock, Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import inputCls from "@/lib/input-class-builder";
import Label from "@/components/shared/reuseable-lable";
import { useLogin } from "@/apis/hooks/auth.hooks";
import type { LoginPayload } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
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

  const onSubmit: SubmitHandler<LoginPayload> = async (data: LoginPayload) => {
    try {
      const response = await Login(data);
      const userRole = response?.data?.user?.role as string;
      
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(redirectTo);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* ── Card ── */}
      <Card className="relative w-full max-w-md bg-background/90 border not-first:rounded-sm px-10 py-12 shadow-2xl">
        {/* ── Header ── */}
        <CardHeader className="mb-9">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-secondary mb-3">
            Welcome back
          </p>
          <h1
            className="text-[32px] font-semibold text-primary leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sign In
          </h1>
          <p className="mt-2 text-sm text-secondary-foreground font-light">
            Enter your credentials to access your account.
          </p>
        </CardHeader>

        {/* ── Form ── */}
        <CardContent>
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
                className="h-10"
              >
                {loginLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>

        <p className="mt-6 text-center text-[13px] text-zinc-500 font-light">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-secondary hover:text-button-hover font-normal transition-colors"
          >
            Create one
          </Link>
        </p>
        <p className="mt-4 text-center text-[13px] text-zinc-500 font-light">
          <Link
            to="/"
            className="text-secondary hover:text-button-hover font-normal transition-colors"
          >
            ← Back to home
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
