import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDialogue } from "@/hooks/dialogue";
import { useUploadAsset } from "@/hooks/assets";
import { useTextEditor } from "@/hooks/text-editor";
import {
  Dialog,
  DialogTitle,
  DialogClose,
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

const ChangeBannerDialogue = () => {
  const { toast } = useToast();
  const { editor } = useTextEditor();
  const { eventTarget } = useDialogue();
  const { upload, url, isLoading, error } = useUploadAsset();

  const [source, setSource] = useState<string>("/default-banner.png");

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (eventTarget) {
      const handleOpen = () => triggerRef.current?.click();
      eventTarget.addEventListener("change-banner-dialogue", handleOpen);
      return () => {
        eventTarget?.removeEventListener("change-banner-dialogue", handleOpen);
      };
    }
  }, [eventTarget]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem with Uploading",
        description: error,
      });
    } else if (error === null) {
      if (url && editor) {
        setTimeout(() => {
          const event = new CustomEvent("banner-changed", {
            detail: { banner: url },
          });
          eventTarget?.dispatchEvent(event);
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
        title: "Problem with Uploading",
        description: "Exactly one file must be selected.",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSource("/default-banner.png");
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
          <DialogTitle>Change The Banner</DialogTitle>
          <DialogDescription>
            Pick an image in order change the banner of this article.
          </DialogDescription>
        </DialogHeader>
        <Img
          className="w-full max-w-[24rem] aspect-[7/4] mx-auto my-1 rounded-md bg-gray-400"
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

export default ChangeBannerDialogue;
