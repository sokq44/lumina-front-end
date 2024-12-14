import SlidingLink from "@/components/sliding-link";
import ThemeSwitch from "@/components/theme-switch";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, MailCheck, MailX } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useVerifyUser } from "@/hooks/user";

const EmailVerifiedPage = () => {
  const { token } = useParams();
  const { toast } = useToast();
  const { error, isLoading } = useVerifyUser(token);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setTitle("Verification Error");
      setDescription(
        "We encountered an issue while verifying your account. If you believe this is an error, please contact us for further assistance."
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
      <div className="bg-background flex items-center justify-center h-screen">
        <LoaderCircle size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      className="bg-background flex items-center justify-center h-screen"
    >
      <ThemeSwitch position="top-right" />
      <div className="flex w-full h-[24rem] md:w-[28rem] lg:w-[34rem] xl:w-[40rem]">
        <div className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl md:py-12">
          <span
            className={
              errorMessage
                ? "text-xl text-center text-destructive font-semibold mb-6"
                : "text-xl text-center text-success font-semibold mb-6"
            }
          >
            {title}
          </span>
          <span className="text-base text-muted-foreground text-center tracking-wide leading-relaxed px-4">
            {description}
          </span>
          <div className="flex flex-col gap-y-4 mt-4 md:flex-row md:gap-x-8">
            <SlidingLink to="/">Back to home</SlidingLink>
            {errorMessage && (
              <SlidingLink to={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`}>
                Contact us
              </SlidingLink>
            )}
            {!errorMessage && <SlidingLink to="/login">Sign in</SlidingLink>}
          </div>
        </div>
        <div className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          {errorMessage ? (
            <MailX size={48} className="text-card" />
          ) : (
            <MailCheck size={48} className="text-card" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailVerifiedPage;
