import {
  FC,
  FormEvent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Comment } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { LoaderCircle, PenLine, Reply, Save, Trash2, X } from "lucide-react";
import Informative from "../ui/informative";
import { useCommentModifier, useCommentRemover } from "@/hooks/api/comments";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface CommentTileProps extends HTMLAttributes<HTMLDivElement> {
  variant: "mine" | "foreign";
  comment: Comment;
  onCommentRemoved?: () => void | Promise<void>;
  onCommentModified?: () => void | Promise<void>;
}

const CommentTile: FC<CommentTileProps> = ({
  variant,
  comment,
  onCommentRemoved,
  onCommentModified,
  className,
  ...props
}) => {
  const { toast } = useToast();
  const commentRemover = useCommentRemover();
  const commentModifier = useCommentModifier();

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (commentRemover.error) {
      toast({
        variant: "destructive",
        title: "Error While Updating a Comment",
        description: commentRemover.error,
      });
    } else if (commentRemover.error === null) {
      toast({
        variant: "default",
        title: "Deleted",
        description: "Comment has been deleted.",
      });
    }
  }, [commentRemover.error]);

  useEffect(() => {
    if (commentModifier.error) {
      toast({
        variant: "destructive",
        title: "Error While Updating a Comment",
        description: commentModifier.error,
      });
    } else if (commentModifier.error === null) {
      toast({
        variant: "success",
        title: "Success!",
        description: "Comment has been modified.",
      });
    }
  }, [commentModifier.error]);

  const changeEditing = () => {
    if (!editing && inputRef.current) {
      inputRef.current.value = comment.content;
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const modify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      await commentModifier.modify(comment.id, inputRef.current.value);
      setEditing(false);
      if (onCommentModified) onCommentModified();
    }
  };

  const remove = async () => {
    await commentRemover.remove(comment.id);
    if (onCommentRemoved) onCommentRemoved();
    buttonRef.current?.click();
  };

  return (
    <Container
      {...props}
      className={cn("bg-none rounded-md px-4 py-3 border", className)}
    >
      <Container className="flex items-center gap-x-2 mb-1">
        <Avatar className="w-8 h-auto col-auto my-auto shadow-md">
          <AvatarImage src={comment.user.image} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Container className="font-semibold">{comment.user.username}</Container>
        <Container className="ml-auto">
          <Informative label="Reply">
            <Button
              disabled={editing}
              variant="outline"
              className="p-0 w-10 h-10"
            >
              <Reply size={16} />
            </Button>
          </Informative>
        </Container>
        {variant === "mine" && (
          <Informative label={editing ? "Cancel" : "Modify"}>
            <Button
              variant="outline"
              onClick={changeEditing}
              className="p-0 w-10 h-10"
            >
              {editing ? <X size={16} /> : <PenLine size={16} />}
            </Button>
          </Informative>
        )}
        {variant === "mine" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={editing}
                variant="destructive"
                className="p-0 w-10 h-10"
              >
                <Trash2 size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="font-funnel">
              <DialogHeader>
                <DialogTitle className="text-destructive">
                  Are you sure?
                </DialogTitle>
                <DialogDescription>
                  Are you certain that you want to delete this comment?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button
                  disabled={commentRemover.isLoading}
                  variant="destructive"
                  onClick={remove}
                >
                  {commentRemover.isLoading ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
                <DialogClose ref={buttonRef} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </Container>
      {!editing && (
        <Container className="text-muted-foreground break-words">
          {comment.content}
        </Container>
      )}

      <form
        onSubmit={modify}
        className={cn(
          "flex gap-x-1 mt-3",
          variant === "mine" && editing ? "visible" : "hidden"
        )}
      >
        <Input ref={inputRef} className="text-muted-foreground" />
        <Informative label="Save Changes">
          <Button
            disabled={commentModifier.isLoading}
            type="submit"
            variant="secondary"
            className="w-10 h-10 p-0"
          >
            {commentModifier.isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
          </Button>
        </Informative>
      </form>
    </Container>
  );
};

export default CommentTile;
