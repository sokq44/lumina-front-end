import { useEffect, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { User } from "@/lib/api";
import { modifyUserFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useGetUser, useModifyUser } from "@/hooks/user";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ImageUp, LoaderCircle } from "lucide-react";
import { useDialogue } from "@/hooks/dialogue";

type ModifyUserForm = z.infer<typeof modifyUserFormSchema>;

const ProfilePage = () => {
  const { toast } = useToast();
  const userGetter = useGetUser();
  const userModifier = useModifyUser();
  const { profilePictureDialogue, eventTarget } = useDialogue();

  const [modifying, setModifying] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const form = useForm<ModifyUserForm>({
    resolver: zodResolver(modifyUserFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    const changed = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newUser = {
        ...currentUser,
        image: customEvent.detail.picture,
      } as User;
      setCurrentUser(newUser);
      userModifier.modify(newUser);
    };

    eventTarget?.addEventListener("profile-picture-changed", changed);

    return () => {
      eventTarget?.removeEventListener("profile-picture-changed", changed);
    };
  }, [eventTarget]);

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
        title: "Failed to Update Profile",
        description: userModifier.error,
      });
    } else if (userModifier.error === null) {
      toast({
        variant: "success",
        title: "Updated Successfully",
        description: "Your profile has been updated successfully!",
      });
    }
  }, [userModifier.error, toast]);

  useEffect(() => {
    if (userGetter.user) {
      setCurrentUser(userGetter.user);
      form.setValue("username", userGetter.user.username);
      form.setValue("email", userGetter.user.email);
    }
  }, [userGetter.user]);

  const onSubmit = async (values: ModifyUserForm) => {
    if (modifying && currentUser) {
      await userModifier.modify({
        username: values.username,
        email: values.email,
        image: currentUser.image,
      });
    }

    setModifying((prev) => !prev);
  };

  const onError = (errors: FieldErrors<ModifyUserForm>) => {
    const message: string = Object.entries(errors).map(
      (entry) => (entry[1].message as string) ?? entry
    )[0];

    if (message) {
      toast({
        variant: "destructive",
        title: "Failed to Update Profile",
        description: message,
      });
    }
  };

  const onCancelModifying = async () => {
    setModifying(false);
    setCurrentUser(userGetter.user);
  };

  const isLoading = userModifier.isLoading || userGetter.isLoading;

  return (
    <Container className="h-full w-full flex flex-col gap-4 items-center lg:justify-center">
      <Card className="w-full h-auto p-8 border-none shadow-none mt-8 lg:mt-0">
        <Container className="w-full flex flex-col items-center gap-y-4">
          <Avatar className="w-32 h-auto shadow-md">
            <AvatarImage src={currentUser?.image} />
            <AvatarFallback className="w-32 h-32 bg-muted">
              <LoaderCircle
                size={24}
                className="animate-spin text-muted-foreground"
              />
            </AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={profilePictureDialogue}
            className={cn(
              modifying ? "visible" : "hidden",
              " gap-x-2 p-3 transition-all duration-300"
            )}
          >
            <ImageUp />
            <span>Change Profile Picture</span>
          </Button>
        </Container>
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
                      placeholder="..."
                      autoComplete="off"
                      disabled={!modifying || isLoading}
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
                      placeholder="..."
                      autoComplete="off"
                      disabled={!modifying || isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Container className="flex w-full space-x-2">
              {modifying && (
                <Button
                  variant="secondary"
                  disabled={isLoading}
                  onClick={onCancelModifying}
                  className="w-full transition-all duration-300"
                >
                  Cancel
                </Button>
              )}
              <Button
                disabled={isLoading}
                type="submit"
                variant={modifying ? "default" : "secondary"}
                className="w-full transition-all duration-300"
              >
                {modifying ? (
                  userModifier.isLoading ? (
                    <LoaderCircle
                      size={24}
                      className="animate-spin text-muted-foreground"
                    />
                  ) : (
                    "Save Changes"
                  )
                ) : (
                  "Update Your Profile"
                )}
              </Button>
            </Container>
          </form>
        </Form>
      </Card>
    </Container>
  );
};

export default ProfilePage;
