import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useChangePassword } from "@/hooks/user";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import { KeyRound, LoaderCircle } from "lucide-react";

const ChangePasswordPage = () => {
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const { change, attempts, isLoading, error } = useChangePassword();

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
    if (error) {
      form.reset();
      toast({
        variant: "destructive",
        title: "Problem With Signing In",
        description: error,
      });
    } else if (error === null) {
      setMessage(
        "Your password has been successfully changed. You may now close this window."
      );
    }
  }, [error, attempts, toast, form]);

  const onSubmit = async (v: z.infer<typeof changePasswordFormSchema>) =>
    token ? change(token, v.password) : null;

  const onError = async (
    errors: FieldErrors<z.infer<typeof changePasswordFormSchema>>
  ) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Problem With Changing Password",
        description: message,
      });
    }
  };

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
            <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
              {message}
            </span>
          ) : (
            <>
              <span className="text-base text-center font-semibold text-muted-foreground mb-4 px-4">
                Please provide and confirm your new password.
              </span>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex flex-col items-center gap-y-6 w-full px-8"
                autoComplete="off"
              >
                <Input
                  disabled={isLoading}
                  type="password"
                  placeholder="New Password"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("password")}
                />
                <Input
                  disabled={isLoading}
                  type="password"
                  placeholder="Repeat New Password"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("repeat")}
                />
                <Button
                  variant={isLoading ? "formSubmitAwaiting" : "formSubmit"}
                  type="submit"
                  className="w-full text-secondary transition-all duration-300"
                >
                  {isLoading ? (
                    <LoaderCircle size={24} className="animate-spin" />
                  ) : (
                    <span>Reset Password</span>
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
