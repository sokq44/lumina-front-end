import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { User } from "@/lib/api";
import { modifyUserFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useGetUser, useModifyUser } from "@/hooks/user";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ImageUp, LoaderCircle } from "lucide-react";

const ProfilePage = () => {
  const userGetter = useGetUser();
  const userModifier = useModifyUser();
  const assetUploader = useUploadAsset();
  const { toast } = useToast();

  const [modifying, setModifying] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(userGetter.user);
  const pictureInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof modifyUserFormSchema>>({
    resolver: zodResolver(modifyUserFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

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
    if (assetUploader.error) {
      toast({
        variant: "destructive",
        title: "Problem With Uploading Image",
        description: assetUploader.error,
      });
    }
  }, [assetUploader.error, toast]);

  useEffect(() => {
    if (userGetter.user) {
      setCurrentUser({
        ...(currentUser as User),
        image: userGetter.user.image,
      });
      form.setValue("username", userGetter.user.username);
      form.setValue("email", userGetter.user.email);
    }
  }, [userGetter.user]);

  useEffect(() => {
    if (assetUploader.url) {
      setCurrentUser({
        ...(currentUser as User),
        image: assetUploader.url,
      });
    }
  }, [assetUploader.url]);

  const onSubmit = async (values: z.infer<typeof modifyUserFormSchema>) => {
    if (modifying && currentUser) {
      await userModifier.modify({
        username: values.username,
        email: values.email,
        image: currentUser.image,
      });
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
        title: "Failed to Update Profile",
        description: message,
      });
    }
  };

  const onPictureChange = async () => {
    const file = pictureInputRef.current?.files?.[0];
    if (file) await assetUploader.upload(file);
  };

  const onCancelModifying = async () => {
    setModifying(false);
    setCurrentUser(userGetter.user);
  };

  const isLoading =
    userModifier.isLoading || userGetter.isLoading || assetUploader.isLoading;

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
          <Input
            ref={pictureInputRef}
            type="file"
            accept="image/*"
            disabled={!modifying}
            onChange={onPictureChange}
            className="hidden"
          />
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => pictureInputRef.current?.click()}
            className={cn(
              modifying ? "visible" : "hidden",
              " gap-x-2 p-3 transition-all duration-300"
            )}
          >
            {assetUploader.isLoading ? (
              "Uploading..."
            ) : (
              <>
                <ImageUp />
                <span>Select a Picture</span>
              </>
            )}
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
