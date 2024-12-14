import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUploadImage } from "@/hooks/assets";
import { useGetUser, useLoggedIn, useModifyUser } from "@/hooks/user";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { modifyUserFormSchema } from "@/lib/schemas";
import { ImageUp, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const loggedIn = useLoggedIn();
  const userGetter = useGetUser();
  const userModifier = useModifyUser();
  const imageUploader = useUploadImage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [modifying, setModifying] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const pictureInputRef = useRef<HTMLInputElement>(null);

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
      setImageUrl(userGetter.user.image);
      form.setValue("username", userGetter.user.username);
      form.setValue("email", userGetter.user.email);
    }
  }, [userGetter.user, form, modifying]);

  useEffect(() => {
    if (imageUploader.error) {
      toast({
        variant: "destructive",
        title: "Problem With Uploading Image",
        description: imageUploader.error,
      });
    }
  }, [imageUploader.attempts, imageUploader.error, toast]);

  useEffect(() => {
    if (imageUploader.url) {
      toast({
        variant: "default",
        title: "Image Uploaded",
        description:
          "The image may not be visible straightaway. Try refreshing the page after saving changes",
      });
      setImageUrl(imageUploader.url);
    }
  }, [imageUploader.url, toast]);

  const onSubmit = async (values: z.infer<typeof modifyUserFormSchema>) => {
    if (modifying) {
      await userModifier.modify({
        username: values.username,
        email: values.email,
        image: imageUrl,
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
        title: "Problem With Modfying Data",
        description: message,
      });
    }
  };

  const onPictureChange = async () => {
    const file = pictureInputRef.current?.files?.[0];

    if (file) {
      await imageUploader.upload(file);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center lg:justify-center">
      <Card className="w-full h-auto p-8 border-none shadow-none mt-8 lg:mt-0">
        <div className="w-full flex flex-col items-center gap-y-4">
          <Avatar className="w-32 h-auto">
            <AvatarImage src={userGetter.user?.image} />
            <AvatarFallback className="w-32 h-32 bg-muted">
              <LoaderCircle size={24} className="animate-spin" />
            </AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            className={`${modifying ? "visible" : "hidden"} gap-2 p-3`}
            onClick={() => pictureInputRef.current?.click()}
          >
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!modifying}
              onChange={onPictureChange}
              ref={pictureInputRef}
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
                      placeholder="..."
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
                      placeholder="..."
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
