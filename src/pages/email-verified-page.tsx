import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useUserVerifier } from "@/hooks/api/user";
import { MailCheck, MailX } from "lucide-react";
import Container from "@/components/ui/container";
import SlidingLink from "@/components/ui/sliding-link";
import ThemeSwitch from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";
import LoadingScreen from "@/components/wraps/loading-screen";

const EmailVerifiedPage = () => {
  const { toast } = useToast();
  const { token } = useParams();
  const { error, isLoading } = useUserVerifier(token);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setTitle("Verification Error");
      setDescription(
        "We encountered an issue while verifying your account. Please try again later."
      );

      toast({
        variant: "destructive",
        title: "Verification Error",
        description: error,
      });
    } else if (error === null) {
      setTitle("Verification Successful");
      setDescription(
        "Your account has been successfully verified. Welcome aboard! Feel free to explore and start your journey to knowledge."
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
          <Container className="w-full flex flex-col gap-y-4 mt-4 px-6 md:flex-row md:gap-x-8 md:justify-center">
            <SlidingLink
              to="/"
              className="w-full px-2 py-[10px] text-sm  bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
            >
              Back to home
            </SlidingLink>
            {!errorMessage && (
              <SlidingLink
                to="/login"
                className="w-full px-2 py-[10px] text-sm  bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
              >
                Sign in
              </SlidingLink>
            )}
          </Container>
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          {errorMessage ? (
            <MailX size={48} className="text-card" />
          ) : (
            <MailCheck size={48} className="text-card" />
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default EmailVerifiedPage;
