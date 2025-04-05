import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDialogue } from "@/hooks/dialogue";
import { useUploadAsset } from "@/hooks/assets";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import Img from "@/components/ui/image";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const ProfilePictureDialogue = () => {
  const { toast } = useToast();
  const dialogues = useDialogue();
  const { url, upload, isLoading, error } = useUploadAsset();

  const [source, setSource] = useState<string>("/default-profile-picture.png");

  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => setSource("/default-profile-picture.png");
  }, []);

  useEffect(() => {
    if (dialogues.eventTarget) {
      const handleOpen = () => triggerRef.current?.click();
      dialogues.eventTarget.addEventListener(
        "change-profile-picture",
        handleOpen
      );

      return () => {
        dialogues.eventTarget?.removeEventListener(
          "change-profile-picture",
          handleOpen
        );
      };
    }
  }, [dialogues.eventTarget]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem with Uploading",
        description: error,
      });
    } else if (error === null) {
      if (url) {
        setTimeout(() => {
          dialogues.eventTarget?.dispatchEvent(
            new CustomEvent("profile-picture-changed", {
              detail: { picture: url },
            })
          );
          closeRef.current?.click();
        }, 0);
      }
    }
  }, [error]);

  const imageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target?.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => setSource(e.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const uploadImage = () => {
    const files = inputRef.current?.files;

    if (files && files.length === 1) {
      upload(files[0]);
    } else {
      toast({
        variant: "destructive",
        title: "Couldn't Change Profile Picture",
        description: "Exactly one file must be selected.",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSource("/iu-holder.webp");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <Dialog onOpenChange={(open) => handleOpenChange(open)}>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Upload a Profile Picture</DialogTitle>
          <DialogDescription>
            Pick an image in order to upload it.
          </DialogDescription>
        </DialogHeader>
        <Img
          className="max-h-52 w-auto mx-auto my-1 rounded-md bg-gray-400"
          src={source}
        />
        <Container className="flex gap-x-2 justify-center">
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={imageChange}
            className="hidden"
          />
          <Container
            onClick={() => inputRef.current?.click()}
            className="w-80 py-2 pl-2 border rounded-sm text-sm text-muted-foreground overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300 cursor-pointer hover:bg-muted"
          >
            <span className="my-auto text-sm">
              {inputRef.current?.value
                ? inputRef.current?.value.split(/[/\\]/).pop()
                : "Pick an Image"}
            </span>
          </Container>
          <Button
            onClick={uploadImage}
            disabled={isLoading || !inputRef.current?.value}
            className="transition-all duration-300"
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Upload"}
          </Button>
          <DialogClose ref={closeRef} />
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureDialogue;
