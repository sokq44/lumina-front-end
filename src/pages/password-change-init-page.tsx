import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { passwordChangeInitSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { usePasswordChangeInit } from "@/hooks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { LoaderCircle, MailQuestion } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";

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
        description: error,
      });
    } else if (error === null) {
      setSentMessage(
        "An email has been sent successfully. Please check your inbox and follow the instructions to reset your password."
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
        description: message,
      });
    }
  };

  return (
    <div className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow />
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
        <div className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
          {sentMessage ? (
            <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
              {sentMessage}
            </span>
          ) : (
            <>
              <span className="text-base text-center font-semibold text-muted-foreground mb-4 px-4">
                Please provide your email address to receive password reset
                instructions.
              </span>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex flex-col items-center gap-y-6 w-full px-8"
                autoComplete="off"
              >
                <Input
                  disabled={isLoading}
                  type="email"
                  placeholder="E-mail Address"
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
                    <span>Send The Instructions</span>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
        <div className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <MailQuestion size={48} className="text-card" />
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordChangeInitPage;
