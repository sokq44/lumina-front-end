import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/text-editor";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TvMinimalPlay } from "lucide-react";
import Informative from "../inform-badge/informative";

const YoutubeMenuItem = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textEditor = useTextEditor();
  const { toast } = useToast();

  const insert = () => {
    const url = inputRef.current?.value;
    const editor = textEditor.editor;

    if (!url) {
      toast({
        variant: "destructive",
        title: "Problem with Youtube Video",
        description: "The URL provided by You isn't valid.",
      });
    } else if (url && editor) {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
        })
        .run();
    }
  };

  return (
    <Dialog>
      <Informative label="Youtube Video">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 w-9 h-9 hover:bg-secondary hover:text-primary dark:hover:bg-black"
          >
            <TvMinimalPlay />
          </Button>
        </DialogTrigger>
      </Informative>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Youtube Video</DialogTitle>
          <DialogDescription>
            Please, provide the URL for your youtube video.
          </DialogDescription>
          <Input ref={inputRef} type="text" className="text-muted-foreground" />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={insert}>Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeMenuItem;
