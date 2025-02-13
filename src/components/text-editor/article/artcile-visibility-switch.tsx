import { FC } from "react";
import { useTextEditor } from "@/hooks/text-editor";
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
import { Button, ButtonProps } from "@/components/ui/button";
import Informative from "@/components/inform-badge/informative";
import { BookCheck, BookLock } from "lucide-react";

interface PrivatePublicSwitchProps extends ButtonProps {
  onChangeVisibility: () => Promise<void>;
}

const ArticleVisibilitySwitch: FC<PrivatePublicSwitchProps> = ({
  onChangeVisibility,
  ...props
}) => {
  const textEditor = useTextEditor();

  return (
    <Dialog>
      <Informative
        label={`Change To ${textEditor.article?.public ? "Private" : "Public"}`}
      >
        <DialogTrigger asChild>
          <Button
            className="p-2 w-9 h-9 transition-all duration-300"
            {...props}
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
            <Button onClick={onChangeVisibility}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleVisibilitySwitch;
