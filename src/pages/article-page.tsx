import { FormEvent, useEffect, useState } from "react";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import { Link, useParams } from "react-router-dom";
import { extensions } from "@/lib/editor-extensions/extensions";
import { extensionToElement, formatDate, getArticleContent } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useArticleGetter } from "@/hooks/api/articles";
import Img from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import GoBackArrow from "@/components/ui/go-back-arrow";
import ThemeSwitch from "@/components/ui/theme-switch";
import LoadingScreen from "@/components/wraps/loading-screen";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCommentCreator, useCommentsGetter } from "@/hooks/api/comments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommentTile from "@/components/article/comment-tile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  BookType,
  LoaderCircle,
  MessageSquareDashed,
  MessageSquareText,
  Send,
} from "lucide-react";
import { useUserGetter } from "@/hooks/api/user";
import Informative from "@/components/ui/informative";

const ArticlePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const userGetter = useUserGetter();
  const articleGetter = useArticleGetter(id);
  const commentsGetter = useCommentsGetter(id);
  const commentCreator = useCommentCreator(id);

  const [content, setContent] = useState<string>("");
  const [bottomSection, setBottomSection] = useState<number>(0);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Article",
        description: articleGetter.error,
      });
    }
  }, [articleGetter.error, toast]);

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

  const getContent = () => {
    if (articleGetter.article) {
      const html = generateHTML(
        getArticleContent(articleGetter.article),
        extensions
      );
      return parse(html, { replace: (node) => extensionToElement(node) });
    }
  };

  const comment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    if (content.length <= 0 || content.length > 255) {
      toast({
        variant: "destructive",
        title: "Problem With Comment",
        description: "Your comment has be at most 255 characters long.",
      });
      return;
    }

    setContent("");

    await commentCreator.create(id, content);
    await commentsGetter.get();
  };

  if (articleGetter.isLoading) {
    return (
      <Container className="w-screen h-screen">
        <LoadingScreen>Retrieving Article...</LoadingScreen>
      </Container>
    );
  }

  return (
    <MediaQuery>
      <More>
        <ThemeSwitch position="top-right" />
        <GoBackArrow position="top-left" />
        <Container className="w-screen h-screen flex justify-center">
          <Container className="w-[60rem] h-full flex flex-col p-4 xl:w-[65rem]">
            <Img
              src={
                articleGetter.article?.banner
                  ? articleGetter.article?.banner
                  : "/default-banner.png"
              }
              className="w-full h-auto aspect-7/4 my-8 rounded-lg brightness-90 shadow-md"
            />
            <Container className="flex items-center gap-x-2 my-6">
              <Avatar className="w-16 h-auto shadow-md">
                <AvatarImage src={articleGetter.article?.user_image} />
                <AvatarFallback>
                  {articleGetter.article?.user[0]}
                </AvatarFallback>
              </Avatar>
              <Container className="flex flex-col items-start gap-y-1">
                <span className="text-5xl font-bold">
                  {articleGetter.article?.title}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  Written by{" "}
                  <Link
                    className="sliding-link font-semibold"
                    to={`/user/${articleGetter.article?.user}`}
                  >
                    @{articleGetter.article?.user}
                  </Link>{" "}
                  on the {formatDate(articleGetter.article?.created_at)}
                </span>
              </Container>
            </Container>
            <hr />
            <Container>{getContent()}</Container>
            <Container className="flex items-center justify-center gap-x-3 mt-2">
              <hr className="w-100" />
              <span className="text-muted-foreground font-bold">
                Written by {articleGetter.article?.user}
              </span>
              <hr className="w-100" />
            </Container>
            <NavigationMenu className="mx-auto mt-12">
              <NavigationMenuList className="border rounded-md py-3 px-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button
                      variant="ghost"
                      onClick={async () => {
                        await commentsGetter.get();
                        setBottomSection(0);
                      }}
                    >
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
              {bottomSection === 0 && (
                <>
                  {userGetter.error === null && commentsGetter.comments ? (
                    <>
                      {commentsGetter.isLoading && (
                        <Container className="flex items-center justify-center text-muted-foreground font-medium">
                          <LoaderCircle size={18} className="animate-spin" />
                          <span>Retrieving comments...</span>
                        </Container>
                      )}
                      <form
                        onSubmit={comment}
                        className="flex items-center jsutify-center gap-x-2 mb-5"
                      >
                        <Input
                          type="text"
                          value={content}
                          placeholder="What are your thoughts?"
                          onChange={(e) => setContent(e.target.value)}
                        />
                        <Informative
                          label={
                            commentCreator.isLoading ? "Loading..." : "Comment"
                          }
                        >
                          <Button
                            type="submit"
                            disabled={
                              commentCreator.isLoading || content.length <= 0
                            }
                            variant="secondary"
                            className="p-0 w-10 h-10"
                          >
                            {commentCreator.isLoading ? (
                              <LoaderCircle
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Send size={16} />
                            )}
                          </Button>
                        </Informative>
                      </form>
                      {commentsGetter.comments.length > 0 && (
                        <>
                          <Container>
                            {commentsGetter.comments &&
                              commentsGetter.comments.map((comment) => (
                                <Container key={comment.id} className="mb-4">
                                  <CommentTile
                                    variant={
                                      userGetter.user?.id === comment.user.id
                                        ? "mine"
                                        : "foreign"
                                    }
                                    comment={comment}
                                    onCommentRemoved={commentsGetter.get}
                                    onCommentModified={commentsGetter.get}
                                  />
                                </Container>
                              ))}
                          </Container>
                        </>
                      )}
                      {commentsGetter.comments.length <= 0 && (
                        <Container className="flex items-center justify-center gap-x-1 text-muted-foreground">
                          <span className="text-lg text-medium">
                            There are no comments for this article yet.
                          </span>
                          <MessageSquareDashed size={24} />
                        </Container>
                      )}
                    </>
                  ) : (
                    <Container className="mt-4 text-center text-red-500">
                      Sorry, but there has been an error while trying to
                      retrieve comments for this article. Please, try again
                      later.
                    </Container>
                  )}
                </>
              )}
              {bottomSection === 1 && (
                <Container className="w-full text-center mt-4">
                  Sorry, but this feature doesn't exist yet. :(
                </Container>
              )}
            </Container>
          </Container>
        </Container>
      </More>
      <Less>
        <ThemeSwitch position="top-right" />
        <GoBackArrow position="top-left" />
        <Container className="w-full pt-16 px-2">
          <Img
            src={
              articleGetter.article?.banner
                ? articleGetter.article?.banner
                : "/default-banner.png"
            }
            className="w-full h-auto aspect-7/4 rounded-lg brightness-90 shadow-md"
          />
          <Container className="flex items-center gap-x-2 my-4">
            <Avatar className="w-14 h-auto shadow-md">
              <AvatarImage src={articleGetter.article?.user_image} />
              <AvatarFallback>{articleGetter.article?.user[0]}</AvatarFallback>
            </Avatar>
            <Container className="flex flex-col items-start gap-y-1">
              <span className="text-xl sm:text-4xl font-bold">
                {articleGetter.article?.title}
              </span>
              <span className="text-sm text-muted-foreground">
                Written by{" "}
                <Link
                  className="sliding-link font-semibold"
                  to={`/user/${articleGetter.article?.user}`}
                >
                  <Badge
                    variant="secondary"
                    className="px-1 text-muted-foreground"
                  >
                    @{articleGetter.article?.user}
                  </Badge>
                </Link>{" "}
                on the {formatDate(articleGetter.article?.created_at)}
              </span>
            </Container>
          </Container>
          <Container className="mt-6 px-2">{getContent()}</Container>
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default ArticlePage;
