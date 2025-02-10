import { Article } from "@/lib/api";
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
import { BookCheck, BookLock } from "lucide-react";

export const PrivatePublicSwitch = () => {
  const textEditor = useTextEditor();
  const articleSaver = useSaveArticle(textEditor.article?.id);
  const articleRemover = useRemoveArticle();

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
      <Informative
        label={`Change To ${textEditor.article?.public ? "Private" : "Public"}`}
      >
        <DialogTrigger asChild>
          <Button
            disabled={
              articleSaver.isLoading ||
              articleRemover.isLoading ||
              !textEditor.article?.id
            }
            className="p-2 w-9 h-9 transition-all duration-300"
          >
            {textEditor.article?.public ? (
              <BookCheck />
            ) : (
              <BookLock size={20} />
            )}
          </Button>
        </DialogTrigger>
      </Informative>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            {textEditor.article?.public
              ? "After you confirm and save, You will be the only one able to see this article."
              : "After you confirm and save, this article will be possible to view for every user."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={changeVisibility}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
