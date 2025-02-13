import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { passwordChangeInitSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { usePasswordChangeInit } from "@/hooks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";
import { LoaderCircle, MailQuestion } from "lucide-react";

const PasswordChangeInitPage = () => {
  const { init, attempts, isLoading, error } = usePasswordChangeInit();
  const { toast } = useToast();
  const [sentMessage, setSentMessage] = useState<string>("");

  const form = useForm<z.infer<typeof passwordChangeInitSchema>>({
    resolver: zodResolver(passwordChangeInitSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (error) {
      form.reset();
      toast({
        variant: "destructive",
        title: "Problem With Sending Email",
        description: error || "Something went wrong. Please try again later.",
      });
    } else if (error === null) {
      setSentMessage(
        "We've sent password reset instructions to your email. Please check your inbox (and spam folder) and follow the link provided to reset your password."
      );
    }
  }, [error, attempts, form, toast]);

  const onSubmit = async (v: z.infer<typeof passwordChangeInitSchema>) =>
    init(v.email);

  const onError = async (
    errors: FieldErrors<z.infer<typeof passwordChangeInitSchema>>
  ) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Problem With Signing In",
        description: message || "Please provide a valid email address.",
      });
    }
  };

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow position="top-left" />
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
          {sentMessage ? (
            <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
              {sentMessage}
            </span>
          ) : (
            <>
              <span className="text-base text-center font-semibold text-muted-foreground mb-4 px-4">
                Enter your email address, and we will send you instructions to
                reset your password.
              </span>

              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex flex-col items-center gap-y-6 w-full px-8"
                autoComplete="off"
              >
                <Input
                  disabled={isLoading}
                  type="email"
                  placeholder="Enter your email address"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("email")}
                />
                <Button
                  variant={isLoading ? "formSubmitAwaiting" : "formSubmit"}
                  type="submit"
                  className="w-full text-secondary transition-all duration-300"
                >
                  {isLoading ? (
                    <LoaderCircle size={24} className="animate-spin" />
                  ) : (
                    <span>Send Password Reset Instructions</span>
                  )}
                </Button>
              </form>
            </>
          )}
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <MailQuestion size={48} className="text-card" />
        </Container>
      </motion.div>
    </Container>
  );
};

export default PasswordChangeInitPage;
