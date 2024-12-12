import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUser, useLoggedIn, useModifyUser } from "@/hooks/user";
import { useEffect, useState } from "react";
import { modifyUserFormSchema } from "@/lib/schemas";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ImageUp, LoaderCircle } from "lucide-react";

const ProfilePage = () => {
  const loggedIn = useLoggedIn();
  const userGetter = useGetUser();
  const userModifier = useModifyUser();
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
    if (userGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Data",
        description: userGetter.error,
      });
    }
  }, [userGetter.error, toast]);

  useEffect(() => {
    if (userModifier.error) {
      toast({
        variant: "destructive",
        title: "Problem With Modifying Data",
        description: userModifier.error,
      });
    } else if (userModifier.error === null) {
      toast({
        variant: "default",
        title: "Modifications Applied",
        description: "Changes have been saved.",
      });
    }
  }, [userModifier.attempts, userModifier.error, toast]);

  useEffect(() => {
    if (userGetter.user && !modifying) {
      form.setValue("username", userGetter.user.username);
      form.setValue("email", userGetter.user.email);
    }
  }, [userGetter.user, form, modifying]);

  const onSubmit = async (values: z.infer<typeof modifyUserFormSchema>) => {
    if (modifying) {
      await userModifier.modify({
        username: values.username,
        email: values.email,
        image: "",
      });

      await userGetter.getUser();
    }

    setModifying((prev) => !prev);
  };

  const onError = async (
    errors: FieldErrors<z.infer<typeof modifyUserFormSchema>>
  ) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Problem With Modfying Data",
        description: message,
      });
    }
  };

  if (userGetter.isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center md:justify-center h-screen w-full">
      <Card className="w-full h-auto p-8 border-none shadow-none">
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
            onSubmit={form.handleSubmit(onSubmit, onError)}
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
            <div className="flex w-full space-x-2">
              {modifying && (
                <Button
                  type="button"
                  className="w-full font-semibold"
                  variant="secondary"
                  onClick={() => setModifying(false)}
                >
                  Cancel
                </Button>
              )}
              <Button
                disabled={userModifier.isLoading}
                type="submit"
                variant={modifying ? "default" : "secondary"}
                className="w-full font-semibold"
              >
                {modifying ? (
                  userModifier.isLoading ? (
                    <LoaderCircle size={24} className="animate-spin" />
                  ) : (
                    "Save Changes"
                  )
                ) : (
                  "Modify Your Data"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
