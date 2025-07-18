import { useEffect } from "react";
import Img from "@/components/ui/image";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { LoaderCircle, LogIn } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Authorized from "@/components/wraps/authorized";
import { FieldErrors, useForm } from "react-hook-form";
import ThemeSwitch from "@/components/ui/theme-switch";
import SlidingLink from "@/components/ui/sliding-link";
import GoBackArrow from "@/components/ui/go-back-arrow";
import { useUserAuthenticator } from "@/hooks/api/auth";
import { LoginForm, loginFormSchema } from "@/lib/schemas";

const LoginPage = () => {
  const { login, isLoading, error } = useUserAuthenticator();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign-In Error",
        description:
          error || "Something went wrong while signing in. Please try again.",
      });
    } else if (error === null) {
      navigate("/user/articles");
    }
  }, [error]);

  const onSubmit = (v: LoginForm) => login(v.email, v.password);

  const onError = async (errors: FieldErrors<LoginForm>) => {
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

  return (
    <Authorized onSuccess={() => navigate("/user/articles")}>
      <Container className="bg-background flex items-center justify-center h-screen">
        <GoBackArrow to="/" position="top-left" />
        <ThemeSwitch position="top-right" />
        <Container className="flex w-full h-[28rem] md:w-[38rem] lg:w-[42rem] xl:w-[48rem]">
          <Container className="flex flex-col gap-y-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
            <Container className="flex items-center justify-center gap-x-2 mb-2">
              <Img src="logo.png" className="w-6" />
              <span className="text-2xl text-[var(--logo)] font-bold">
                Lumina
              </span>
            </Container>

            <span className="text-center font-medium text-muted-foreground mb-2 px-4">
              Welcome back! Please enter your credentials to access your
              account.
            </span>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="flex flex-col items-center gap-y-4 w-full px-8"
              autoComplete="off"
            >
              <Input
                variant="login"
                disabled={isLoading}
                type="email"
                placeholder="Enter your email address"
                {...form.register("email")}
              />
              <Input
                variant="login"
                disabled={isLoading}
                type="password"
                placeholder="Enter your password"
                {...form.register("password")}
              />
              <Button
                variant={isLoading ? "formSubmitAwaiting" : "formSubmit"}
                type="submit"
                className="w-full bg-[var(--logo)] text-white transition-all duration-300 hover:bg-zinc-700"
              >
                {isLoading ? (
                  <LoaderCircle size={24} className="animate-spin text-white" />
                ) : (
                  "Log In to Your Account"
                )}
              </Button>
            </form>
            <Container className="w-full flex flex-col items-center gap-y-2 px-8 mt-2 md:flex-row md:gap-x-4 md:mt-4 md:justify-center">
              <SlidingLink
                to="/register"
                className="w-full px-2 py-[10px] text-[var(--logo)] text-sm  bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
              >
                Create an Account
              </SlidingLink>
              <SlidingLink
                to="/password"
                className="w-full px-2 py-[10px] text-[var(--logo)] text-sm bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
              >
                Reset Your Password
              </SlidingLink>
            </Container>
          </Container>
          <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-[var(--logo)] md:shadow-md bg-[var(--logo)] rounded-e-2xl">
            <LogIn size={48} className="text-white" />
          </Container>
        </Container>
      </Container>
    </Authorized>
  );
};

export default LoginPage;
