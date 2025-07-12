import { cn } from "@/lib/utils";
import { User } from "@/lib/api";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogue } from "@/hooks/use-dialogue";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useUserGetter, useUserModifier } from "@/hooks/api/user";
import { ModifyUserForm, modifyUserFormSchema } from "@/lib/schemas";
import { ImageUp, LoaderCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormDescription,
} from "@/components/ui/form";

const ProfilePage = () => {
  const { toast } = useToast();
  const userGetter = useUserGetter();
  const userModifier = useUserModifier();
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
    if (eventTarget) {
      const changed = (event: Event) => {
        setTimeout(() => {
          const customEvent = event as CustomEvent;
          setCurrentUser((prevUser) => {
            if (prevUser) {
              userModifier.modify({
                ...prevUser,
                image: customEvent.detail.picture,
              } as User);
              return {
                ...prevUser,
                image: customEvent.detail.picture,
              };
            }
            return prevUser;
          });
        }, 0);
      };
      eventTarget.addEventListener("profile-picture-changed", changed);
      return () => {
        eventTarget.removeEventListener("profile-picture-changed", changed);
      };
    }
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
      <Card className="w-full h-auto p-8 border-none shadow-none mt-8 bg-body lg:mt-0">
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
              " gap-x-2 p-3 cursor-pointer transition-all duration-300"
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
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Email Address can only be changed in the Account section
                  </FormDescription>
                </FormItem>
              )}
            />
            <Container className="flex w-full space-x-2">
              {modifying && (
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isLoading}
                  onClick={onCancelModifying}
                  className="w-full cursor-pointer transition-all duration-300"
                >
                  Cancel
                </Button>
              )}
              <Button
                disabled={isLoading}
                type="submit"
                variant={modifying ? "default" : "secondary"}
                className="w-full cursor-pointer transition-all duration-300"
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
