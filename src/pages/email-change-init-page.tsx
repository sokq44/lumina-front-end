import { EmailChangeInitForm, emailChangeInitSchema } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import ThemeSwitch from "@/components/ui/theme-switch";
import GoBackArrow from "@/components/ui/go-back-arrow";
import { LoaderCircle, MailQuestion } from "lucide-react";
import { useEmailChangeInitializer } from "@/hooks/api/user";

const EmailChangeInitPage = () => {
  const { toast } = useToast();
  const { init, isLoading, error } = useEmailChangeInitializer();
  const [sentMessage, setSentMessage] = useState<string>("");

  const form = useForm<EmailChangeInitForm>({
    resolver: zodResolver(emailChangeInitSchema),
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
        "We've sent email change instructions to the new email address you've provided. Please check your inbox (and spam folder) and follow the link provided to change your email address."
      );
    }
  }, [error]);

  const onSubmit = async (v: EmailChangeInitForm) => init(v.email);

  const onError = async (errors: FieldErrors<EmailChangeInitForm>) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Problem With Changing Email Address",
        description: message || "Please provide a valid email address.",
      });
    }
  };

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow position="top-left" />
      <ThemeSwitch position="top-right" />
      <Container className="flex w-full h-[24rem] md:w-[38rem] lg:w-[42rem] xl:w-[48rem]">
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
          {sentMessage ? (
            <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
              {sentMessage}
            </span>
          ) : (
            <>
              <span className="text-base text-center font-semibold text-muted-foreground mb-4 px-4">
                Enter your new email address, and we will send you instructions
                to change the current one.
              </span>

              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex flex-col items-center gap-y-6 w-full px-8"
                autoComplete="off"
              >
                <Input
                  disabled={isLoading}
                  type="email"
                  placeholder="Enter your new email address"
                  className="transition-all duration-300 focus-visible:ring-offset-1"
                  {...form.register("email")}
                />
                <Button
                  variant={isLoading ? "formSubmitAwaiting" : "formSubmit"}
                  type="submit"
                  className="w-full text-white bg-[var(--logo)] PasswordChangeInitPagetransition-all duration-300 hover:bg-zinc-700"
                >
                  {isLoading ? (
                    <LoaderCircle size={24} className="animate-spin" />
                  ) : (
                    <span>Send Email Address Change Instructions</span>
                  )}
                </Button>
              </form>
            </>
          )}
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:shadow-md bg-[var(--logo)] rounded-e-2xl">
          <MailQuestion size={48} className="text-white" />
        </Container>
      </Container>
    </Container>
  );
};

export default EmailChangeInitPage;
