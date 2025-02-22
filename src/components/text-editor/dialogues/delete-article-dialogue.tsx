import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/text-editor";
import { useRemoveArticle } from "@/hooks/articles";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEditorDialogue } from "@/hooks/editor-dialogue";

const DeleteArticleDialogue = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const textEditor = useTextEditor();
  const articleRemover = useRemoveArticle();
  const editorDialogue = useEditorDialogue();

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (editorDialogue.eventTarget) {
      const handleOpen = () => triggerRef.current?.click();
      editorDialogue.eventTarget.addEventListener(
        "delete-article-dialogue",
        handleOpen
      );

      return () => {
        editorDialogue.eventTarget?.removeEventListener(
          "delete-article-dialogue",
          handleOpen
        );
      };
    }
  }, [editorDialogue.eventTarget]);

  useEffect(() => {
    if (articleRemover.error) {
      toast({
        variant: "destructive",
        title: "Problem With Deleting",
        description: articleRemover.error,
      });
    } else if (articleRemover.error === null) {
      textEditor.finishArticle();
      navigate("/user/my-articles");
    }
  }, [articleRemover.error, toast, navigate]);

  const deleteArticle = async () => {
    const id = textEditor.article?.id;
    if (id) await articleRemover.remove(id);
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
            <Button
              variant="destructive"
              disabled={articleRemover.isLoading}
              onClick={deleteArticle}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticleDialogue;
