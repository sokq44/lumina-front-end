import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { MailCheck, MailX } from "lucide-react";
import Container from "@/components/ui/container";
import { useEmailChanger } from "@/hooks/api/user";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "@/components/ui/theme-switch";
import LoadingScreen from "@/components/wraps/loading-screen";

const EmailChangedPage = () => {
  const { toast } = useToast();
  const { token } = useParams();
  const { change, error, isLoading } = useEmailChanger();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const blockedRef = useRef<boolean>(false);

  useEffect(() => {
    if (token && !blockedRef.current) {
      change(token);
      blockedRef.current = true;
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setTitle("Email Address Change Error");
      setDescription(
        "We encountered an issue while changing your email address. Please try again later."
      );

      toast({
        variant: "destructive",
        title: "Email Address Change Error",
        description: error,
      });
    } else if (error === null) {
      setTitle("Email Address Changed Successfully");
      setDescription(
        "Your email address has been successfully changed. You may now close this window and go back to your profile."
      );
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <Container className="w-screen h-screen">
        <LoadingScreen>Verifying...</LoadingScreen>
      </Container>
    );
  }

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <ThemeSwitch position="top-right" />
      <Container className="flex w-full h-[24rem] md:w-[28rem] lg:w-[34rem] xl:w-[40rem]">
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl md:py-12">
          <span
            className={cn(
              errorMessage ? "text-destructive" : "text-success",
              "text-xl text-center font-bold mb-6"
            )}
          >
            {title}
          </span>
          <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
            {description}
          </span>
          <Container className="w-full flex flex-col gap-y-4 mt-4 px-6 md:flex-row md:gap-x-8 md:justify-center"></Container>
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:shadow-md bg-[var(--logo)] rounded-e-2xl">
          {errorMessage ? (
            <MailX size={48} className="text-white" />
          ) : (
            <MailCheck size={48} className="text-white" />
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default EmailChangedPage;
