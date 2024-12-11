import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUser, useLoggedIn } from "@/hooks/user";
import { useEffect, useState } from "react";
import { modifyUserFormSchema } from "@/lib/schemas";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ImageUp, LoaderCircle } from "lucide-react";

const ProfilePage = () => {
  const loggedIn = useLoggedIn();
  const getUser = useGetUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [modifying, setModifying] = useState<boolean>(false);

  const form = useForm<z.infer<typeof modifyUserFormSchema>>({
    resolver: zodResolver(modifyUserFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (loggedIn.error) navigate("/login");
  }, [loggedIn.isLoggedIn, loggedIn.error, navigate]);

  useEffect(() => {
    if (getUser.error) {
      toast({
        variant: "destructive",
        title: "Problem With Signing In",
        description: getUser.error,
      });
    }
  }, [getUser.error, toast]);

  useEffect(() => {
    if (getUser.user && !modifying) {
      form.setValue("username", getUser.user.username);
      form.setValue("email", getUser.user.email);
    }
  }, [getUser.user, form, modifying]);

  useEffect(() => {
    if (getUser.error) {
      toast({
        variant: "destructive",
        title: "Problem With Signing In",
        description: getUser.error,
      });
    }
  }, [getUser.error, toast]);

  const onSubmit = async (values: z.infer<typeof modifyUserFormSchema>) => {
    if (modifying) {
      console.log(values);
    }

    setModifying((prev) => !prev);
  };

  if (getUser.isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
      <span className="text-2xl font-bold">My Profile</span>
      <Card className="w-full h-auto p-8 transition-all duration-300">
        <div className="w-full flex flex-col items-center gap-y-4">
          <Avatar className="w-32 h-auto">
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            className={`${modifying ? "visible" : "hidden"} gap-2 p-3`}
          >
            <Input
              type="hidden"
              accept="image/*"
              className="text-sm"
              disabled={!modifying}
            />
            <ImageUp />
            <span>Select Picture</span>
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full transition-all duration-300">
                  <Label htmlFor="username">Username</Label>
                  <FormControl>
                    <Input
                      id="username"
                      variant="login"
                      type="text"
                      placeholder="Username"
                      autoComplete="off"
                      disabled={!modifying}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full transition-all duration-300">
                  <Label htmlFor="email">Email Address</Label>
                  <FormControl>
                    <Input
                      id="email"
                      variant="login"
                      type="text"
                      placeholder="Email"
                      autoComplete="off"
                      disabled={!modifying}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={modifying ? "default" : "secondary"}
              className="w-full font-semibold"
            >
              {modifying ? "Save Changes" : "Modify Your Data"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
