import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import {
  useChangePassword,
  useLogout,
  usePasswordChangeValid,
} from "@/hooks/user";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import { KeyRound, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ChangePasswordPage = () => {
  const logout = useLogout();
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const changePassword = useChangePassword(token);
  const changePasswordValid = usePasswordChangeValid(token);

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
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
    if (changePasswordValid.error) {
      setTitle("Password Change Error");
      setMessage(
        changePasswordValid.error ||
          "We encountered a problem while veifying this password change request. Please try again later."
      );
    }
  }, [changePasswordValid.error, toast]);

  useEffect(() => {
    if (changePassword.error) {
      form.reset();
      toast({
        variant: "destructive",
        title: "Password Change Error",
        description:
          changePassword.error ||
          "We encountered a problem while changing your password. Please try again later.",
      });
    } else if (changePassword.error === null) {
      setTitle("Password Changed");
      setMessage(
        "Your password has been successfully updated. You may now close this window and log in with your new password."
      );
    }
  }, [changePassword.error, toast, form]);

  const onSubmit = async (values: z.infer<typeof changePasswordFormSchema>) => {
    if (token) {
      await logout.logout();
      await changePassword.change(values.password);
    }
  };

  const onError = async (
    errors: FieldErrors<z.infer<typeof changePasswordFormSchema>>
  ) => {
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

  const anyError = changePassword.error || changePasswordValid.error;

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <ThemeSwitch position="top-right" />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        className="flex w-full h-[24rem] md:w-[38rem] lg:w-[42rem] xl:w-[48rem]"
      >
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
          {message ? (
            <>
              <span
                className={cn(
                  anyError ? "text-destructive" : "text-success",
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
                  disabled={changePassword.isLoading}
                  type="password"
                  placeholder="Enter new password"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("password")}
                />
                <Input
                  disabled={changePassword.isLoading}
                  type="password"
                  placeholder="Confirm new password"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("repeat")}
                />
                <Button
                  variant={
                    changePassword.isLoading
                      ? "formSubmitAwaiting"
                      : "formSubmit"
                  }
                  type="submit"
                  className="w-full text-secondary transition-all duration-300"
                >
                  {changePassword.isLoading ? (
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
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <KeyRound size={48} className="text-card" />
        </Container>
      </motion.div>
    </Container>
  );
};

export default ChangePasswordPage;
