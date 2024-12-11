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

  const modifyUserForm = useForm<z.infer<typeof modifyUserFormSchema>>({
    resolver: zodResolver(modifyUserFormSchema),
  });

  useEffect(() => {
    if (loggedIn.error) navigate("/login");
  }, [loggedIn.isLoggedIn, loggedIn.error, navigate]);

  useEffect(() => {
    if (getUser.user) {
      modifyUserForm.setValue("username", getUser.user.username);
      modifyUserForm.setValue("email", getUser.user.email);
    }
  }, [getUser.user, modifyUserForm]);

  useEffect(() => {
    if (getUser.error) {
      toast({
        variant: "destructive",
        title: "Problem With Signing In",
        description: getUser.error,
      });
    }
  }, [getUser.error, toast]);

  const modifyUserFormOnSubmit = async () => {};

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
        <Form {...modifyUserForm}>
          <form
            onSubmit={modifyUserForm.handleSubmit(modifyUserFormOnSubmit)}
            className="flex flex-col items-center gap-y-4"
          >
            <FormField
              control={modifyUserForm.control}
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
              control={modifyUserForm.control}
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
              variant={modifying ? "default" : "secondary"}
              className="w-full font-semibold"
              onClick={() => setModifying((prev) => !prev)}
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
