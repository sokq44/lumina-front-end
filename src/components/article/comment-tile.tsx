import {
  FC,
  useRef,
  useState,
  FormEvent,
  useEffect,
  HTMLAttributes,
} from "react";
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
import { Comment } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { cn, formatDateTimeLocal } from "@/lib/utils";
import Informative from "@/components/ui/informative";
import { useCommentModifier, useCommentRemover } from "@/hooks/api/comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EllipsisVertical,
  LoaderCircle,
  PenLine,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Less, MediaQuery, More } from "../wraps/media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CommentTileProps extends HTMLAttributes<HTMLDivElement> {
  variant: "mine" | "foreign";
  comment: Comment;
  onCommentRemoved?: () => void | Promise<void>;
  onCommentModified?: () => void | Promise<void>;
}

const CommentTile: FC<CommentTileProps> = ({
  variant,
  comment,
  className,
  onCommentRemoved,
  onCommentModified,
  ...props
}) => {
  const { toast } = useToast();
  const commentRemover = useCommentRemover();
  const commentModifier = useCommentModifier();

  const closeDialogRef = useRef<HTMLButtonElement>(null);
  const triggerDialogRef = useRef<HTMLButtonElement>(null);

  const [editing, setEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>("");

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
        title: "Comment Deleted",
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
        title: "Comment Modified",
        description: "Comment has been modified.",
      });
    }
  }, [commentModifier.error]);

  const changeEditing = () => {
    if (!editing) {
      setNewContent(comment.content);
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const modify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await commentModifier.modify(comment.id, newContent);
    setEditing(false);
    if (onCommentModified) onCommentModified();
  };

  const remove = async () => {
    await commentRemover.remove(comment.id);
    if (onCommentRemoved) await onCommentRemoved();
    closeDialogRef.current?.click();
  };

  return (
    <MediaQuery>
      <More>
        <Container
          {...props}
          className={cn("bg-none rounded-md px-4 py-3 border", className)}
        >
          <Container className="flex items-center gap-x-2 mb-1">
            <Avatar className="w-10 h-auto col-auto my-auto shadow-md outline">
              <AvatarImage src={comment.user.image} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Container>
              <p className="font-semibold">{comment.user.username}</p>
              <p className="text-sm text-muted-foreground">
                {comment.created_at === comment.last_modified
                  ? `Created on ${formatDateTimeLocal(comment.created_at)}`
                  : `Last Modified on ${formatDateTimeLocal(
                      comment.last_modified
                    )}`}
              </p>
            </Container>
            <Container className="ml-auto">
              {/* TODO: Implement discussions */}
              {/* <Informative label="Reply">
            <Button
              disabled={editing}
              variant="outline"
              className="p-0 w-10 h-10"
            >
              <Reply size={16} />
            </Button>
          </Informative> */}
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
                    className="p-0 w-10 h-10 text-white"
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
                      className="text-white"
                    >
                      {commentRemover.isLoading ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                    <DialogClose ref={closeDialogRef} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </Container>
          <hr className="my-2 mb-3" />
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
            <Input
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="text-muted-foreground"
            />
            <Informative label="Save Changes">
              <Button
                disabled={
                  commentModifier.isLoading ||
                  newContent.length <= 0 ||
                  newContent.length > 255
                }
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
      </More>
      <Less>
        <Container>
          <Container
            {...props}
            className={cn("bg-none rounded-md px-4 py-3 border", className)}
          >
            <Container className="flex items-center gap-x-2">
              <Avatar className="w-10 h-auto col-auto my-auto shadow-md outline">
                <AvatarImage src={comment.user.image} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Container>
                <p className="font-semibold">{comment.user.username}</p>
                <Container className="flex items-center justify-center gap-x-1 text-sm text-muted-foreground">
                  <PenLine size={14} />
                  {formatDateTimeLocal(
                    comment.created_at === comment.last_modified
                      ? comment.created_at
                      : comment.last_modified
                  )}
                </Container>
              </Container>
              {editing && (
                <Button
                  variant="outline"
                  onClick={changeEditing}
                  className="ml-auto p-0 w-8 h-8"
                >
                  <X size={14} />
                </Button>
              )}
              {!editing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={editing}
                      className="p-0 w-8 h-8 ml-auto"
                    >
                      <EllipsisVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {variant === "mine" && (
                      <DropdownMenuItem onClick={changeEditing}>
                        <span className="text-muted-foreground font-medium">
                          Modify
                        </span>
                        <DropdownMenuShortcut>
                          <PenLine size={14} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                    {variant === "mine" && (
                      <DropdownMenuItem
                        onClick={() => triggerDialogRef.current?.click()}
                      >
                        <span className="text-destructive font-medium">
                          Delete
                        </span>
                        <DropdownMenuShortcut>
                          <Trash2 size={14} className="text-destructive" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                  {variant === "mine" && (
                    <Dialog>
                      <DialogTrigger ref={triggerDialogRef} />
                      <DialogContent className="font-funnel">
                        <DialogHeader>
                          <DialogTitle className="text-destructive">
                            Are you sure?
                          </DialogTitle>
                          <DialogDescription>
                            Are you certain that you want to delete this
                            comment?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button
                            disabled={commentRemover.isLoading}
                            variant="destructive"
                            onClick={remove}
                            className="text-white"
                          >
                            {commentRemover.isLoading ? (
                              <LoaderCircle
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                          <DialogClose ref={closeDialogRef} />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </DropdownMenu>
              )}
            </Container>
            <hr className="my-2 mb-3" />
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
              <Input
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="text-muted-foreground"
              />
              <Informative label="Save Changes">
                <Button
                  disabled={
                    commentModifier.isLoading ||
                    newContent.length <= 0 ||
                    newContent.length > 255
                  }
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
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default CommentTile;
