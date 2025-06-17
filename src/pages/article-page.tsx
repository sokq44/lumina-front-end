import { useEffect, useRef } from "react";
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

const ArticlePage = () => {
  const { toast } = useToast();
  const { state } = useLocation();
  const articleGetter = useArticleGetter(state.article.id);
  const commentsGetter = useCommentsGetter(state.article.id);
  const commentCreator = useCommentCreator(state.article.id);

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
            <Container className="flex gap-x-2">
              <Input ref={inputRef} type="text" placeholder="Comment" />
              <Button onClick={comment}>Comment</Button>
            </Container>
            <Container>
              <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words">
                {JSON.stringify(commentsGetter.comments, null, 2)}
              </pre>
            </Container>
            <hr />
            <Container className="mt-4">{getContent()}</Container>
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
