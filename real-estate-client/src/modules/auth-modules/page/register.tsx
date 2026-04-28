import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
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
import Label from "@/components/shared/reuseable-lable";
import inputCls from "@/lib/input-class-builder";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import type { RegisterPayload } from "../types";
import { useRegister } from "@/apis/hooks/auth.hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/shared/field";

// Error message
const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1.5 text-xs text-red-400">{msg}</p> : null;

const Register = () => {
  //hooks
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
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

  const { mutateAsync: RegisterUser, isPending: registerLoading } =
    useRegister();

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      await RegisterUser(data);
    navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  // Password strength
  const pw = watch("password") || "";
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md bg-background/95 rounded-xl px-6 py-8 shadow-xl">
        
        {/* Header */}
        <CardHeader className="mb-6 space-y-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
            Get started
          </p>
          <h1 className="text-2xl font-semibold text-primary">
            Create Account
          </h1>
          <p className="text-sm text-secondary-foreground">
            Fill in your details to create a new account.
          </p>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <FieldGroup>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <Label>First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <Input
                      {...register("firstName")}
                      placeholder="John"
                      className={cn(inputCls(!!errors.firstName), "pl-10 h-11")}
                    />
                  </div>
                  <ErrorMsg msg={errors.firstName?.message} />
                </Field>

                <Field>
                  <Label>Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <Input
                      {...register("lastName")}
                      placeholder="Doe"
                      className={cn(inputCls(!!errors.lastName), "pl-10 h-11")}
                    />
                  </div>
                  <ErrorMsg msg={errors.lastName?.message} />
                </Field>
              </div>

              {/* Username */}
              <Field>
                <Label>Username</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <Input
                    {...register("userName")}
                    placeholder="john_doe"
                    className={cn(inputCls(!!errors.userName), "pl-10 h-11")}
                  />
                </div>
                <ErrorMsg msg={errors.userName?.message} />
              </Field>

              {/* Email */}
              <Field>
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={cn(inputCls(!!errors.email), "pl-10 h-11")}
                  />
                </div>
                <ErrorMsg msg={errors.email?.message} />
              </Field>

              {/* Role */}
              <Field>
                <Label>Role</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 z-10" size={16} />
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className={cn(inputCls(!!errors.role), "pl-10 h-11")}>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <ErrorMsg msg={errors.role?.message} />
              </Field>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <Input
                    {...register("password")}
                    type={showPw ? "text" : "password"}
                    placeholder="Min 8 chars, 1 uppercase, number, symbol"
                    className={cn(inputCls(!!errors.password), "pl-10 pr-10 h-11")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Strength */}
                {pw.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1 flex-1 rounded-full",
                            i <= strength ? strengthColor : "bg-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500">
                      Strength:{" "}
                      <span
                        className={cn(
                          strength <= 1 && "text-red-400",
                          strength === 2 && "text-amber-400",
                          strength === 3 && "text-yellow-400",
                          strength === 4 && "text-emerald-400"
                        )}
                      >
                        {strengthLabel}
                      </span>
                    </p>
                  </div>
                )}

                <ErrorMsg msg={errors.password?.message} />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={registerLoading}
                className="h-10"

              >
                {registerLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

            </FieldGroup>
          </form>
        </CardContent>

        <p className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link to="/" className="text-secondary hover:text-amber-400">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;