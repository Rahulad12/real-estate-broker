import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLegend } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  User,
  Hash,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { CreateUserValidation } from "../validation-schema/user.validation";
import Label from "@/components/ui/custom/reuseable-lable";
import inputCls from "@/lib/input-class-builder";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { RegisterPayload } from "../types";
import { useRegister } from "@/apis/hooks/auth.hooks";

//Reusable error message
const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1.5 text-xs text-red-400">{msg}</p> : null;

const Register = () => {
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      role: "user",
    },
    resolver: zodResolver(CreateUserValidation),
  });

  //mutation
  const { mutateAsync: Register, isPending: registerLoading } = useRegister();

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      await Register(data)
    } catch (error) {
      
    }
  };

  // Password strength
  const pw = watch("password");
  const strength = [
    pw.length >= 8,
    /[A-Z]/.test(pw),
    /[0-9]/.test(pw),
    /[^a-zA-Z0-9]/.test(pw),
  ].filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-amber-500",
    "bg-yellow-400",
    "bg-emerald-500",
  ][strength];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="relative w-full max-w-lg bg-zinc-900/90 border border-zinc-800 rounded-sm px-10 py-12 shadow-2xl">
        {/* ── Header ── */}
        <div className="mb-9">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-secondary mb-3">
            Get started
          </p>
          <h1
            className="text-[32px] font-semibold text-primary-foreground leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Create Account
          </h1>
          <p className="mt-2 text-sm text-secondary-foreground/50 font-light">
            Fill in your details to create a new account.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="space-y-5">
            <FieldLegend className="sr-only">Register</FieldLegend>

            {/* First & Last name — side by side */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label>First Name</Label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  />
                  <Input
                    {...register("firstName")}
                    placeholder="John"
                    autoComplete="given-name"
                    className={inputCls(!!errors.firstName)}
                  />
                </div>
                <ErrorMsg msg={errors.firstName?.message} />
              </Field>

              <Field>
                <Label>Last Name</Label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  />
                  <Input
                    {...register("lastName")}
                    placeholder="Doe"
                    autoComplete="family-name"
                    className={inputCls(!!errors.lastName)}
                  />
                </div>
                <ErrorMsg msg={errors.lastName?.message} />
              </Field>
            </div>

            {/* Username */}
            <Field>
              <Label>Username</Label>
              <div className="relative">
                <Hash
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <Input
                  {...register("userName")}
                  placeholder="john_doe"
                  autoComplete="username"
                  className={inputCls(!!errors.userName)}
                />
              </div>
              <ErrorMsg msg={errors.userName?.message} />
            </Field>

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
              <ErrorMsg msg={errors.email?.message} />
            </Field>

            {/* Role selector */}
            <Field>
              <Label>Role</Label>
              <div className="relative">
                <ShieldCheck
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <select
                  {...register("role")}
                  className={cn(
                    inputCls(
                      !!errors.role,
                      "pr-8 appearance-none cursor-pointer",
                    ),
                    "bg-zinc-800/50",
                  )}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {/* Chevron — kept as inline SVG since lucide ChevronDown would need same wrapper */}
                <svg
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <ErrorMsg msg={errors.role?.message} />
            </Field>

            {/* Password */}
            <Field>
              <Label>Password</Label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <Input
                  {...register("password")}
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 6 chars, 1 uppercase, 1 number, 1 special character"
                  autoComplete="new-password"
                  className={inputCls(!!errors.password, "pr-11")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Strength bar */}
              {pw.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-0.5 flex-1 rounded-full transition-all duration-300",
                          i <= strength ? strengthColor : "bg-zinc-700",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Strength:{" "}
                    <span
                      className={cn(
                        strength <= 1 && "text-red-400",
                        strength === 2 && "text-amber-400",
                        strength === 3 && "text-yellow-400",
                        strength === 4 && "text-emerald-400",
                      )}
                    >
                      {strengthLabel}
                    </span>
                  </p>
                </div>
              )}
              <ErrorMsg msg={errors.password?.message} />
            </Field>

            {/* Submit */}
            <Button
              type="submit"
              disabled={registerLoading}
              className={cn(
                "w-full mt-2 py-3.5 rounded-sm text-[11px] font-medium tracking-[0.18em] uppercase",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              )}
            >
              {registerLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </FieldGroup>
        </form>

        {/* ── Sign in link ── */}
        <div className="flex items-center gap-3 mt-8">
          <span className="flex-1 h-px bg-zinc-800" />
          <span className="text-[11px] text-zinc-600 tracking-wide">or</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        <p className="mt-6 text-center text-[13px] text-zinc-500 font-light">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-secondary hover:text-amber-400 font-normal transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
