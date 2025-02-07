import { useTextEditor } from "@/hooks/text-editor";
import { Button } from "../ui/button";
import { useInformBadge } from "@/hooks/inform-badge";
import { ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChangeEventHandler, useRef, useState } from "react";

const ImageUploader = () => {
  const [imageSource, setImageSource] = useState<string>(
    "/image-uploader-placeholder.webp"
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textEditor = useTextEditor();
  const { showInformBadge, clearInformBadge } = useInformBadge();

  const filePath = inputRef.current?.value;

  const imageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target?.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSource(e.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onMouseOver={() => showInformBadge("Upload Image")}
          onMouseLeave={() => clearInformBadge()}
          className="p-2 w-9 h-9 hover:bg-secondary hover:text-primary dark:hover:bg-black"
        >
          <ImagePlus />
        </Button>
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
        <div className="flex gap-x-2">
          <input ref={inputRef} type="file" onChange={imageChange} hidden />
          <div
            onClick={() => inputRef.current?.click()}
            className="flex items-center pl-2 w-full border rounded-sm text-sm text-muted-foreground transition-all duration-300 hover:cursor-pointer hover:bg-muted"
          >
            {filePath ? filePath : "Pick an Image"}
          </div>
          <Button onClick={() => inputRef.current?.click()}>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
