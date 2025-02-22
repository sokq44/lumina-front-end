import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/assets";
import { useTextEditor } from "@/hooks/text-editor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";

const ImageMenuItem = () => {
  const [imageSource, setImageSource] = useState<string>(
    "/image-uploader-placeholder.webp"
  );
  const { toast } = useToast();
  const textEditor = useTextEditor();
  const assetUploader = useUploadAsset();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (assetUploader.error) {
      toast({
        variant: "destructive",
        title: "Problem with Uploading",
        description: assetUploader.error,
      });
    } else if (assetUploader.error === null) {
      if (assetUploader.url) {
        console.log(assetUploader.url);
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
      reader.onload = (e) => setImageSource(e.target?.result as string);
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

  // const resetImagePicker = () => {
  //   if (inputRef.current) inputRef.current.value = "";
  //   setImageSource("/image-uploader-placeholder.webp");
  // };

  const onDialogOpenChange = (open: boolean) => {
    console.log(open);
  };

  return (
    <Dialog onOpenChange={(open) => onDialogOpenChange(open)}>
      <DialogTrigger asChild>
        <ContextMenuItem inset className="cursor-pointer">
          Upload Image
          <ContextMenuShortcut>
            <ImagePlus size={14} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </DialogTrigger>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Upload an Image</DialogTitle>
          <DialogDescription>
            Pick an image in order to upload it.
          </DialogDescription>
        </DialogHeader>
        <img
          className="max-h-52 w-auto mx-auto my-1 rounded-md bg-gray-400"
          src={imageSource}
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

export default ImageMenuItem;
