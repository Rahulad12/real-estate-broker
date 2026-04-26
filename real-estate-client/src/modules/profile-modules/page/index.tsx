import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useGetUserDetailsById, useUpdateEmail, useUpdatePassword } from "@/apis/hooks/user.hooks";
import { UpdateEmailSchema, UpdatePasswordSchema } from "../validation/profile.schema";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock } from "lucide-react";
import { UpdateEmailPayload, UpdatePasswordPayload } from "../types/profile.types";

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and security.</p>
      </div>

      <div className="grid gap-8">
        {/* User Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Personal Information
            </CardTitle>
            <CardDescription>Your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Username</p>
                <p className="text-lg">{user?.userName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-lg">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <p className="text-lg capitalize">{user?.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Change Email Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" /> Change Email
              </CardTitle>
              <CardDescription>Update your email address.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <Field>
                  <FieldLabel>New Email</FieldLabel>
                  <Input {...emailForm.register("newEmail")} type="email" placeholder="new@example.com" />
                  <FieldError errors={[emailForm.formState.errors.newEmail]} />
                </Field>
                <Field>
                  <FieldLabel>Current Password</FieldLabel>
                  <Input {...emailForm.register("currentPassword")} type="password" placeholder="••••••••" />
                  <FieldError errors={[emailForm.formState.errors.currentPassword]} />
                </Field>
                <Button type="submit" className="w-full" disabled={updateEmailMutation.isPending}>
                  {updateEmailMutation.isPending ? "Updating..." : "Update Email"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" /> Change Password
              </CardTitle>
              <CardDescription>Ensure your account is using a long, random password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <Input {...passwordForm.register("newPassword")} type="password" placeholder="••••••••" />
                  <FieldError errors={[passwordForm.formState.errors.newPassword]} />
                </Field>
                <Field>
                  <FieldLabel>Confirm New Password</FieldLabel>
                  <Input {...passwordForm.register("confirmPassword")} type="password" placeholder="••••••••" />
                  <FieldError errors={[passwordForm.formState.errors.confirmPassword]} />
                </Field>
                <Field>
                  <FieldLabel>Current Password</FieldLabel>
                  <Input {...passwordForm.register("currentPassword")} type="password" placeholder="••••••••" />
                  <FieldError errors={[passwordForm.formState.errors.currentPassword]} />
                </Field>
                <Button type="submit" className="w-full" disabled={updatePasswordMutation.isPending}>
                  {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
