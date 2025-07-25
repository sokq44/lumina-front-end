import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/use-text-editor";
import { useDialogue } from "@/hooks/use-dialogue";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteArticleDialogue = () => {
  const { toast } = useToast();
  const textEditor = useTextEditor();
  const dialogues = useDialogue();

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dialogues.eventTarget) {
      const handleOpen = () => triggerRef.current?.click();
      dialogues.eventTarget.addEventListener(
        "delete-article-dialogue",
        handleOpen
      );
      return () => {
        dialogues.eventTarget?.removeEventListener(
          "delete-article-dialogue",
          handleOpen
        );
      };
    }
  }, [dialogues.eventTarget]);

  const deleteArticle = async () => {
    if (textEditor.article) {
      textEditor.onRemove(textEditor.article);
    } else {
      toast({
        variant: "destructive",
        title: "Problem With Removing",
        description:
          "There was an unexpected error while trying to remove this article.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} />
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle className="text-destructive">Are you sure?</DialogTitle>
          <DialogDescription>
            Are you certain that you want to delete this article?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={deleteArticle}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticleDialogue;
