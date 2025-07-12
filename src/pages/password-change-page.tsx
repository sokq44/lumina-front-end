import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordForm, changePasswordFormSchema } from "@/lib/schemas";
import {
  usePasswordChanger,
  useSessionTerminator,
  usePasswordChangeValidator,
} from "@/hooks/api/user";
import { useToast } from "@/hooks/use-toast";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/ui/theme-switch";
import { KeyRound, LoaderCircle } from "lucide-react";

const PasswordChangePage = () => {
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const sessionTerminator = useSessionTerminator();
  const passwordChanger = usePasswordChanger(token);
  const passwordChangeValidator = usePasswordChangeValidator(token);

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: "",
      repeat: "",
    },
  });

  useEffect(() => {
    if (!token) navigate("/user");
  }, [token, navigate]);

  useEffect(() => {
    if (passwordChangeValidator.error) {
      setTitle("Password Change Error");
      setMessage(
        passwordChangeValidator.error ||
          "We encountered a problem while veifying this password change request. Please try again later."
      );
    }
  }, [passwordChangeValidator.error, toast]);

  useEffect(() => {
    if (passwordChanger.error) {
      form.reset();
      toast({
        variant: "destructive",
        title: "Password Change Error",
        description:
          passwordChanger.error ||
          "We encountered a problem while changing your password. Please try again later.",
      });
    } else if (passwordChanger.error === null) {
      setTitle("Password Changed");
      setMessage(
        "Your password has been successfully updated. You may now close this window and log in with your new password."
      );
    }
  }, [passwordChanger.error]);

  const onSubmit = async (values: ChangePasswordForm) => {
    if (token) {
      await sessionTerminator.logout();
      await passwordChanger.change(values.password);
    }
  };

  const onError = async (errors: FieldErrors<ChangePasswordForm>) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description:
          message ||
          "Please make sure your passwords meet the required criteria.",
      });
    }
  };

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <ThemeSwitch position="top-right" />
      <Container className="flex w-full h-[24rem] md:w-[38rem] lg:w-[42rem] xl:w-[48rem]">
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
          {message ? (
            <>
              <span
                className={cn(
                  passwordChanger.error || passwordChangeValidator.error
                    ? "text-destructive"
                    : "text-success",
                  "text-xl font-bold text-center tracking-wide leading-relaxed px-4"
                )}
              >
                {title}
              </span>
              <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
                {message}
              </span>
            </>
          ) : (
            <>
              <span className="text-base text-center font-semibold text-muted-foreground mb-4 px-4">
                Set a new password to secure your account.
              </span>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex flex-col items-center gap-y-6 w-full px-8"
                autoComplete="off"
              >
                <Input
                  disabled={passwordChanger.isLoading}
                  type="password"
                  placeholder="Enter new password"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("password")}
                />
                <Input
                  disabled={passwordChanger.isLoading}
                  type="password"
                  placeholder="Confirm new password"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("repeat")}
                />
                <Button
                  variant={
                    passwordChanger.isLoading
                      ? "formSubmitAwaiting"
                      : "formSubmit"
                  }
                  type="submit"
                  className="w-full text-white bg-[var(--logo)] transition-all duration-300 hover:bg-zinc-700"
                >
                  {passwordChanger.isLoading ? (
                    <LoaderCircle
                      size={24}
                      className="animate-spin text-secondary"
                    />
                  ) : (
                    <span>Change Password</span>
                  )}
                </Button>
              </form>
            </>
          )}
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:shadow-md bg-[var(--logo)] rounded-e-2xl">
          <KeyRound size={48} className="text-white" />
        </Container>
      </Container>
    </Container>
  );
};

export default PasswordChangePage;
