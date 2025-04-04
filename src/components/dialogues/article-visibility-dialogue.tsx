import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDialogue } from "@/hooks/dialogue";
import { useTextEditor } from "@/hooks/text-editor";
import { Article } from "@/lib/api";
import { useEffect, useRef } from "react";

const ArticleVisibilityDialogue = () => {
  const textEditor = useTextEditor();
  const dialogues = useDialogue();

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dialogues.eventTarget) {
      const handleOpen = () => triggerRef?.current?.click();

      dialogues.eventTarget.addEventListener(
        "article-visibility-dialogue",
        handleOpen
      );

      return () => {
        dialogues.eventTarget?.removeEventListener(
          "article-visibility-dialogue",
          handleOpen
        );
      };
    }
  }, [dialogues.eventTarget]);

  const changeVisibility = async () => {
    const previousArticle = textEditor.article;
    if (previousArticle) {
      const newArticle = {
        ...(previousArticle as Article),
        public: !previousArticle.public,
      };

      textEditor.setArticle(newArticle);
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} />
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            {textEditor.article?.public
              ? "After you confirm and save, this article will be marked as private, which means only you will be able to see it."
              : "After you confirm and save, this article will be marked as public, which means everyone will be able to read it."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={changeVisibility}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleVisibilityDialogue;
