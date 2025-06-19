import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import { Link, useLocation } from "react-router-dom";
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
import { BookType, MessageSquareText } from "lucide-react";

const ArticlePage = () => {
  const { toast } = useToast();
  const { state } = useLocation();
  const articleGetter = useArticleGetter(state.article.id);
  const commentsGetter = useCommentsGetter(state.article.id);
  const commentCreator = useCommentCreator(state.article.id);

  const [bottomSection, setBottomSection] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    console.log("Comments:", commentsGetter.comments);
  }, [commentsGetter.comments]);

  useEffect(() => {
    console.log("Error:", commentsGetter.error);
  }, [commentsGetter.error]);

  const getContent = () => {
    if (articleGetter.article) {
      const html = generateHTML(
        getArticleContent(articleGetter.article),
        extensions
      );
      return parse(html, { replace: (node) => extensionToElement(node) });
    }
  };

  const comment = async () => {
    if (inputRef.current) {
      const content = inputRef.current.value;
      await commentCreator.create({
        article_id: state.article.id,
        comment: { content },
      });
      await commentsGetter.get();
    }
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
                    <Button variant="ghost" onClick={() => setBottomSection(0)}>
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
                  <Container className="flex gap-x-2 mb-5">
                    <Input ref={inputRef} type="text" placeholder="Comment" />
                    <Button onClick={comment}>Comment</Button>
                  </Container>
                  <Container>
                    {commentsGetter.comments &&
                      commentsGetter.comments.map((comment) => (
                        <Container key={comment.id} className="mb-4">
                          <CommentTile comment={comment} />
                        </Container>
                      ))}
                  </Container>
                </>
              )}
              {bottomSection === 1 && (
                <Container className="w-full text-center mt-4">
                  We're sorry, but this feature doesn't exist yet. :(
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
