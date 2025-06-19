import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Comment } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentTileProps extends HTMLAttributes<HTMLDivElement> {
  comment: Comment;
}

const CommentTile: FC<CommentTileProps> = ({
  comment,
  className,
  ...props
}) => {
  return (
    <Container
      {...props}
      className={cn("bg-none rounded-md px-4 py-3 border", className)}
    >
      <Container className="flex items-center gap-x-1 mb-1">
        <Avatar className="w-8 h-auto col-auto my-auto shadow-md">
          <AvatarImage src={comment.user.image} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Container className="font-semibold">{comment.user.username}</Container>
        <Button variant="outline" className="ml-auto">
          <span>Reply</span>
        </Button>
      </Container>
      <Container className="text-muted-foreground break-words">
        {comment.content}
      </Container>
    </Container>
  );
};

export default CommentTile;
