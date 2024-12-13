import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useLoggedIn, useLogin } from "@/hooks/user";
import { useNavigate } from "react-router-dom";
import { Circle, LoaderCircle, LogIn } from "lucide-react";
import { FieldErrors, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/lib/schemas";
import GoBackArrow from "@/components/go-back-arrow";
import ThemeSwitch from "@/components/theme-switch";
import SlidingLink from "@/components/sliding-link";
import { motion } from "motion/react";

const LoginPage = () => {
  const login = useLogin();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (loggedIn.isLoggedIn) navigate("/user");
  }, [loggedIn.isLoggedIn, navigate]);

  useEffect(() => {
    if (login.error) {
      toast({
        variant: "destructive",
        title: "Problem With Signing In",
        description: login.error,
      });
    } else if (login.error === null) {
      navigate("/user");
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
        title: "Problem With Signing In",
        description: message,
      });
    }
  };

  if (loggedIn.isLoading) {
    return (
      <div className="bg-background flex items-center justify-center h-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow to="/" />
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
        <div className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl">
          {/* Logo Placeholder */}
          <Circle strokeWidth="1px" fill="" size={84} />

          <span className="text-base text-center font-semibold text-muted-foreground mb-4 px-4">
            Provide your credentials in order to sign in.
          </span>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="flex flex-col items-center gap-y-6 w-full px-8"
            autoComplete="off"
          >
            <Input
              variant="login"
              disabled={login.isLoading}
              type="email"
              placeholder="E-mail Address"
              {...form.register("email")}
            />
            <Input
              variant="login"
              disabled={login.isLoading}
              type="password"
              placeholder="Password"
              {...form.register("password")}
            />
            <Button
              variant={login.isLoading ? "formSubmitAwaiting" : "formSubmit"}
              type="submit"
              className="w-full text-secondary transition-all duration-300"
            >
              {login.isLoading ? (
                <LoaderCircle size={24} className="animate-spin" />
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
          <div className="flex flex-col gap-y-2 mt-4 md:flex-row md:gap-x-4">
            <SlidingLink to="/register">Don't Have an Account?</SlidingLink>
            <SlidingLink to="/password-change-init">
              Forgot Your Password?
            </SlidingLink>
          </div>
        </div>
        <div className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <LogIn size={48} className="text-card" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
