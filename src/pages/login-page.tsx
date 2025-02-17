import { useEffect } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { loginFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLoggedIn, useLogin } from "@/hooks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Circle, LoaderCircle, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import SlidingLink from "@/components/sliding-link";
import GoBackArrow from "@/components/go-back-arrow";

const LoginPage = () => {
  const login = useLogin();
  const { toast } = useToast();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (loggedIn.isLoggedIn) navigate("/user/articles");
  }, [loggedIn.isLoggedIn, navigate]);

  useEffect(() => {
    if (login.error) {
      toast({
        variant: "destructive",
        title: "Sign-In Error",
        description:
          login.error ||
          "Something went wrong while signing in. Please try again.",
      });
    } else if (login.error === null) {
      navigate("/user/articles");
    }
  }, [login.error, navigate, toast]);

  const onSubmit = (v: z.infer<typeof loginFormSchema>) =>
    login.login(v.email, v.password);

  const onError = async (
    errors: FieldErrors<z.infer<typeof loginFormSchema>>
  ) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Form Submission Error",
        description: message || "Please check your input and try again.",
      });
    }
  };

  if (loggedIn.isLoading) {
    return (
      <Container className="bg-background flex items-center justify-center h-screen text-muted-foreground">
        <LoaderCircle size={24} className="animate-spin" />
        <span className="ml-2 text-lg">Checking your login status...</span>
      </Container>
    );
  }
  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow to="/" position="top-left" />
      <ThemeSwitch position="top-right" />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        className="flex w-full h-[28rem] md:w-[38rem] lg:w-[42rem] xl:w-[48rem]"
      >
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
          {/* Logo Placeholder */}
          <Circle strokeWidth="1px" fill="" size={84} />

          <span className="text-center font-medium text-muted-foreground mb-2 px-4">
            Welcome back! Please enter your credentials to access your account.
          </span>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="flex flex-col items-center gap-y-4 w-full px-8"
            autoComplete="off"
          >
            <Input
              variant="login"
              disabled={login.isLoading}
              type="email"
              placeholder="Enter your email address"
              {...form.register("email")}
            />
            <Input
              variant="login"
              disabled={login.isLoading}
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />
            <Button
              variant={login.isLoading ? "formSubmitAwaiting" : "formSubmit"}
              type="submit"
              className="w-full text-secondary transition-all duration-300"
            >
              {login.isLoading ? (
                <LoaderCircle
                  size={24}
                  className="animate-spin text-secondary"
                />
              ) : (
                "Log In to Your Account"
              )}
            </Button>
          </form>
          <Container className="w-full flex flex-col items-center gap-y-2 px-8 mt-2 md:flex-row md:gap-x-4 md:mt-4 md:justify-center">
            <SlidingLink
              to="/register"
              className="w-full px-2 py-[10px] text-sm  bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
            >
              Create an Account
            </SlidingLink>
            <SlidingLink
              to="/password"
              className="w-full px-2 py-[10px] text-sm bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
            >
              Reset Your Password
            </SlidingLink>
          </Container>
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <LogIn size={48} className="text-card" />
        </Container>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
