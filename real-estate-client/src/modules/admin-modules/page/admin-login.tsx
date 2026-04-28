import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLegend } from "@/components/shared/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/modules/auth-modules/validation-schema/user.validation";
import { Lock, Mail, Loader2, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import inputCls from "@/lib/input-class-builder";
import { useLogin } from "@/apis/hooks/auth.hooks";
import type { LoginPayload } from "@/modules/auth-modules/types";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginValidation),
  });

  const { mutateAsync: Login, isPending: loginLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    try {
      await Login(data);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="relative w-full max-w-md bg-background/90 border not-first:rounded-sm px-10 py-12 shadow-2xl">
        <CardHeader className="mb-9">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-secondary mb-3">
            Admin Panel
          </p>
          <CardTitle
            className="text-[32px] font-semibold text-primary leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Admin Login
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-secondary-foreground font-light">
            Enter your admin credentials to access the panel.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="space-y-6">
              <FieldLegend className="sr-only">Admin Login</FieldLegend>

              {/* Email */}
              <Field>
                <label className="mb-2" htmlFor="email">Email</label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="admin@example.com"
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
                  <label htmlFor="password">Password</label>
                </div>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
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
                className="h-10 w-full"
              >
                {loginLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  "Login to Admin Panel"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
