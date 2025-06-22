import {
  Send,
  BookType,
  LoaderCircle,
  MessageCircleOff,
  MessageSquareText,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserGetter } from "@/hooks/api/user";
import Container from "@/components/ui/container";
import Informative from "@/components/ui/informative";
import SlidingLink from "@/components/ui/sliding-link";
import CommentTile from "@/components/article/comment-tile";
import { FC, FormEvent, HTMLAttributes, useEffect, useState } from "react";
import { useCommentCreator, useCommentsGetter } from "@/hooks/api/comments";

interface BottomSectionProps extends HTMLAttributes<HTMLDivElement> {
  articleId: string;
}

const BottomSection: FC<BottomSectionProps> = ({ articleId, ...props }) => {
  const { toast } = useToast();
  const { user, ...userGetter } = useUserGetter();
  const { create, ...commentCreator } = useCommentCreator();
  const { comments, get, ...commentsGetter } = useCommentsGetter(articleId);

  const [content, setContent] = useState<string>("");
  const [bottomSection, setBottomSection] = useState<number>(0);

  useEffect(() => {
    if (commentCreator.error) {
      toast({
        variant: "destructive",
        title: "Problem With Creating Comment",
        description: commentCreator.error,
      });
    } else if (commentCreator.error === null) {
      toast({
        variant: "success",
        title: "Comment Created",
        description: "Your comment has been successfully created.",
      });
    }
  }, [commentCreator.error, toast]);

  const comment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!articleId) return;
    setContent("");
    await create(articleId, content);
    await get();
  };

  const loggedIn = userGetter.error === null;
  const commentsPresent = comments && comments.length > 0;

  return (
    <Container {...props}>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="border rounded-md py-3 px-4 w-[96vw] mx-auto md:w-auto">
          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={async () => {
                await get();
                setBottomSection(0);
              }}
              asChild
            >
              <Button variant="ghost">
                <Container className="flex items-center gap-x-1 text-muted-foreground">
                  <MessageSquareText />
                  <span className="text-md font-bold">Comments</span>
                </Container>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <Container className="w-[1px] h-full bg-muted-foreground"></Container>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant="ghost" onClick={() => setBottomSection(1)}>
                <Container className="flex items-center gap-x-1 text-muted-foreground">
                  <BookType />
                  <span className="font-bold">Similar Topics</span>
                </Container>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Container className="min-h-[48rem] mb-12">
        {/* If the 'comments' option was selected in the nav menu. */}
        {bottomSection === 0 && (
          <>
            {userGetter.error && (
              <>
                <Container className="flex items-center justify-center gap-x-2 text-muted-foreground">
                  <MessageCircleOff size={48} />
                  <span className="text-5xl">Comments are blocked</span>
                </Container>
                <Container className="text-center mt-3">
                  In order to share your thoughts about this article you must
                  register{" "}
                  <SlidingLink
                    to="/register"
                    className="font-medium text-blue-500"
                  >
                    here
                  </SlidingLink>{" "}
                  or log into your account{" "}
                  <SlidingLink
                    to="/login"
                    className="font-medium text-blue-500"
                  >
                    here
                  </SlidingLink>
                  .
                </Container>
              </>
            )}

            {/* If the user is logged in, display the input for commenting. */}
            {loggedIn && (
              <>
                <form
                  onSubmit={comment}
                  className="flex items-center jsutify-center gap-x-2 mb-3"
                >
                  <Input
                    disabled={commentsGetter.isLoading}
                    type="text"
                    value={content}
                    placeholder={
                      commentsGetter.isLoading
                        ? "Retrieving comments..."
                        : "What are your thoughts?"
                    }
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Informative
                    label={commentCreator.isLoading ? "Loading..." : "Comment"}
                  >
                    <Button
                      type="submit"
                      disabled={
                        commentsGetter.isLoading ||
                        commentCreator.isLoading ||
                        content.length <= 0 ||
                        content.length > 255
                      }
                      variant="secondary"
                      className="p-0 w-10 h-10"
                    >
                      {commentsGetter.isLoading || commentCreator.isLoading ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} className="text-muted-foreground" />
                      )}
                    </Button>
                  </Informative>
                </form>
              </>
            )}

            {/* If the user is logged in and there are some comments, display them. */}
            {loggedIn && commentsPresent && (
              <>
                <Container>
                  {comments &&
                    comments.map((comment) => (
                      <Container key={comment.id} className="mb-4">
                        <CommentTile
                          variant={
                            user?.id === comment.user.id ? "mine" : "foreign"
                          }
                          comment={comment}
                          onCommentRemoved={get}
                          onCommentModified={get}
                        />
                      </Container>
                    ))}
                </Container>
              </>
            )}

            {/* If the user is logged in, but there are no comments, display information about that. */}
            {loggedIn && !commentsPresent && (
              <Container className=" text-muted-foreground bg-muted px-4 py-2 rounded-md">
                There are no comments on this article yet.
              </Container>
            )}
          </>
        )}

        {/* If the 'similar topic' option was selected in the nav menu. */}
        {bottomSection === 1 && (
          <>
            <Container className="text-4xl text-muted-foreground font-semibold text-center">
              Under Construction
            </Container>

            <Container className="text-center text-muted-foreground mt-3">
              This feature is not available yet, but we're actively working on
              it! Stay tuned for updates—exciting things are on the way. Thank
              you for your patience and for being part of our early community.
            </Container>
          </>
        )}
      </Container>
    </Container>
  );
};

export default BottomSection;
