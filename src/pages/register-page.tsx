import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/lib/schemas";
import { useRegister } from "@/hooks/user";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm, FieldErrors } from "react-hook-form";
import { Circle, LoaderCircle, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import SlidingLink from "@/components/sliding-link";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, attempts, isLoading, error } = useRegister();

  const [email, setEmail] = useState<string>("");

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPass: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign-Up Error",
        description:
          error ||
          "An issue occurred while creating your account. Please try again later.",
      });
    } else if (error === null) {
      navigate("/email", { state: { email: email } });
    }
  }, [attempts, error, navigate, toast, email]);

  const onSubmit = (v: z.infer<typeof registerFormSchema>) => {
    register(v.username, v.email, v.password);
    setEmail(v.email);
  };

  const onError = async (
    errors: FieldErrors<z.infer<typeof registerFormSchema>>
  ) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Form Submission Error",
        description:
          message || "Please ensure all fields are correctly filled out.",
      });
    }
  };

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow position="top-left" to="/" />
      <ThemeSwitch position="top-right" />
      <Container className="flex w-full h-[34rem] md:w-[34rem] lg:w-[44rem] xl:w-[64rem]">
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl md:py-12">
          {/* Logo Placeholder */}
          <Circle strokeWidth="1px" fill="" size={84} />

          <span className="text-center font-medium text-muted-foreground mb-2 px-4">
            Create an account by filling in the details below.
          </span>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="flex flex-col items-center gap-y-4 w-full px-8"
            autoComplete="off"
          >
            <Input
              variant="register"
              disabled={isLoading}
              type="text"
              placeholder="Choose a Username"
              {...form.register("username")}
            />
            <Input
              variant="register"
              disabled={isLoading}
              type="text"
              placeholder="Enter you email address"
              {...form.register("email")}
            />
            <Input
              variant="register"
              disabled={isLoading}
              type="password"
              placeholder="Create a strong Password"
              {...form.register("password")}
            />
            <Input
              variant="register"
              disabled={isLoading}
              type="password"
              placeholder="Repeat your password"
              {...form.register("repeatPass")}
            />
            <Button
              variant={isLoading ? "formSubmitAwaiting" : "formSubmit"}
              type="submit"
              className="w-full transition-all duration-300"
            >
              {isLoading ? (
                <LoaderCircle
                  size={24}
                  className="animate-spin text-secondary"
                />
              ) : (
                <span>Sign Up Now</span>
              )}
            </Button>
            <SlidingLink
              to="/login"
              className="w-full px-2 py-[10px] text-sm bg-secondary rounded-md md:bg-transparent md:w-auto md:p-0 md:text-base md:font-normal md:rounded-none"
            >
              Already have an account?
            </SlidingLink>
          </form>
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <UserPlus size={48} className="text-card" />
        </Container>
      </Container>
    </Container>
  );
};

export default RegisterPage;
