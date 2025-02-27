import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/assets";
import { useTextEditor } from "@/hooks/text-editor";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEditorDialogue } from "@/hooks/editor-dialogue";

const UploadImageDialogue = () => {
  const { toast } = useToast();
  const textEditor = useTextEditor();
  const assetUploader = useUploadAsset();
  const editorDialogue = useEditorDialogue();

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [source, setSource] = useState<string>("/iu-holder.webp");

  useEffect(() => {
    if (editorDialogue.eventTarget) {
      const handleOpen = () => triggerRef.current?.click();
      editorDialogue.eventTarget.addEventListener(
        "upload-image-dialogue",
        handleOpen
      );

      return () => {
        editorDialogue.eventTarget?.removeEventListener(
          "upload-image-dialogue",
          handleOpen
        );
      };
    }
  }, [editorDialogue.eventTarget]);

  useEffect(() => {
    if (assetUploader.error) {
      toast({
        variant: "destructive",
        title: "Problem with Uploading",
        description: assetUploader.error,
      });
    } else if (assetUploader.error === null) {
      if (assetUploader.url) {
        textEditor.editor
          ?.chain()
          .focus()
          .setImage({ src: assetUploader.url })
          .run();
      }
    }
  }, [assetUploader.error]);

  const imageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target?.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => setSource(e.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const uploadImage = async () => {
    const files = inputRef.current?.files;

    if (files) {
      if (files?.length < 1) {
        toast({
          variant: "destructive",
          title: "Problem with Uploading",
          description: "No file selected",
        });
      }

      await assetUploader.upload(files[0]);
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
          <DialogTitle>Upload an Image</DialogTitle>
          <DialogDescription>
            Pick an image in order to upload it.
          </DialogDescription>
        </DialogHeader>
        <img
          className="max-h-52 w-auto mx-auto my-1 rounded-md bg-gray-400"
          src={source}
        />
        <Container className="flex gap-x-2">
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={imageChange}
            className="hidden"
          />
          <Container
            onClick={() => inputRef.current?.click()}
            className="flex items-center pl-2 w-full border rounded-sm text-sm text-muted-foreground transition-all duration-300 cursor-pointer hover:bg-muted"
          >
            {inputRef.current?.value
              ? inputRef.current?.value.split(/[/\\]/).pop()
              : "Pick an Image"}
          </Container>
          <DialogClose asChild>
            <Button
              variant={
                assetUploader.isLoading || !inputRef.current?.value
                  ? "ghost"
                  : "default"
              }
              onClick={uploadImage}
              disabled={assetUploader.isLoading || !inputRef.current?.value}
            >
              {assetUploader.isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </DialogClose>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageDialogue;
