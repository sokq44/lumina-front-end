import { useTextEditor } from "@/hooks/text-editor";
import { useRemoveArticle, useSaveArticle } from "@/hooks/articles";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Informative from "@/components/inform-badge/informative";
import { LoaderCircle, Trash2 } from "lucide-react";

const DeleteArticleButton = () => {
  const textEditor = useTextEditor();
  const articleSaver = useSaveArticle(textEditor.article?.id);
  const articleRemover = useRemoveArticle();

  const deleteArticle = async () => {
    const id = textEditor.article?.id;
    if (id) await articleRemover.remove(id);
  };

  return (
    <Dialog>
      <Informative label="Delete Article">
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={
              articleSaver.isLoading ||
              articleRemover.isLoading ||
              !textEditor.article?.id
            }
            className="p-2 w-9 h-9 transition-all duration-300"
          >
            <Trash2 />
          </Button>
        </DialogTrigger>
      </Informative>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle className="text-destructive">Are you sure?</DialogTitle>
          <DialogDescription>
            Are you certain that you want to delete this article?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={articleRemover.isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              disabled={articleRemover.isLoading}
              onClick={deleteArticle}
            >
              {articleSaver.isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticleButton;
