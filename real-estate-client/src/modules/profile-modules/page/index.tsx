import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useGetUserDetailsById, useUpdateEmail, useUpdatePassword } from "@/apis/hooks/user.hooks";
import { UpdateEmailSchema, UpdatePasswordSchema } from "../validation/profile.schema";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import type { UpdateEmailPayload, UpdatePasswordPayload } from "../types/profile.types";
import inputCls from "@/lib/input-class-builder";

const ProfilePage = () => {
  const { data: userDetails, isLoading } = useGetUserDetailsById();
  const updateEmailMutation = useUpdateEmail();
  const updatePasswordMutation = useUpdatePassword();

  const user = userDetails?.data;

  const emailForm = useForm<UpdateEmailPayload>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: {
      newEmail: "",
      currentPassword: "",
    },
  });

  const passwordForm = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
  });

  const onEmailSubmit = (data: UpdateEmailPayload) => {
    updateEmailMutation.mutate(data, {
      onSuccess: () => emailForm.reset(),
    });
  };

  const onPasswordSubmit = (data: UpdatePasswordPayload) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => passwordForm.reset(),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <CardHeader className="mb-6 space-y-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
            Account settings
          </p>
          <h1 className="text-2xl font-semibold text-primary">
            Profile Settings
          </h1>
          <p className="text-sm text-secondary-foreground font-light">
            Manage your account information and security.
          </p>
        </CardHeader>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" /> Personal Information
              </CardTitle>
              <CardDescription>Your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Username</p>
                  <p className="text-lg text-secondary-foreground">{user?.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-lg text-secondary-foreground">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                  <p className="text-lg text-secondary-foreground">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="text-lg text-secondary-foreground capitalize">{user?.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="mb-6 space-y-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                  Security
                </p>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-secondary" /> Change Email
                </CardTitle>
                <CardDescription>Update your email address.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6" noValidate>
                  <Field>
                    <FieldLabel className="mb-2">New Email</FieldLabel>
                    <Input 
                      {...emailForm.register("newEmail")} 
                      type="email" 
                      placeholder="new@example.com"
                      className={inputCls(!!emailForm.formState.errors.newEmail)}
                    />
                    {emailForm.formState.errors.newEmail && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {emailForm.formState.errors.newEmail.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel className="mb-2">Current Password</FieldLabel>
                    <Input 
                      {...emailForm.register("currentPassword")} 
                      type="password" 
                      placeholder="Enter password"
                      className={inputCls(!!emailForm.formState.errors.currentPassword)}
                    />
                    {emailForm.formState.errors.currentPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {emailForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </Field>
                  <Button type="submit" className="h-10 w-full" disabled={updateEmailMutation.isPending}>
                    {updateEmailMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      "Update Email"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="mb-6 space-y-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                  Security
                </p>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-secondary" /> Change Password
                </CardTitle>
                <CardDescription>Ensure your account is using a long, random password.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6" noValidate>
                  <Field>
                    <FieldLabel className="mb-2">New Password</FieldLabel>
                    <Input 
                      {...passwordForm.register("newPassword")} 
                      type="password" 
                      placeholder="Min 8 characters"
                      className={inputCls(!!passwordForm.formState.errors.newPassword)}
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel className="mb-2">Confirm New Password</FieldLabel>
                    <Input 
                      {...passwordForm.register("confirmPassword")} 
                      type="password" 
                      placeholder="Confirm password"
                      className={inputCls(!!passwordForm.formState.errors.confirmPassword)}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel className="mb-2">Current Password</FieldLabel>
                    <Input 
                      {...passwordForm.register("currentPassword")} 
                      type="password" 
                      placeholder="Enter current password"
                      className={inputCls(!!passwordForm.formState.errors.currentPassword)}
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </Field>
                  <Button type="submit" className="h-10 w-full" disabled={updatePasswordMutation.isPending}>
                    {updatePasswordMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;