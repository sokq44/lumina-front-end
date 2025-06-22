import { useEffect } from "react";
import parse from "html-react-parser";
import Img from "@/components/ui/image";
import { generateHTML } from "@tiptap/react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Link, useParams } from "react-router-dom";
import ThemeSwitch from "@/components/ui/theme-switch";
import { useArticleGetter } from "@/hooks/api/articles";
import GoBackArrow from "@/components/ui/go-back-arrow";
import LoadingScreen from "@/components/wraps/loading-screen";
import { extensions } from "@/lib/editor-extensions/extensions";
import BottomSection from "@/components/article/bottom-section";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { extensionToElement, formatDate, getArticleContent } from "@/lib/utils";

const ArticlePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const articleGetter = useArticleGetter(id);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Article",
        description: articleGetter.error,
      });
    }
  }, [articleGetter.error, toast]);

  const getContent = () => {
    if (articleGetter.article) {
      const html = generateHTML(
        getArticleContent(articleGetter.article),
        extensions
      );
      return parse(html, { replace: (node) => extensionToElement(node) });
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
                @{articleGetter.article?.user}
              </span>
              <hr className="w-100" />
            </Container>
            {id && <BottomSection articleId={id} className="mt-12" />}
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
          <hr />
          <Container className="mt-6 px-2">{getContent()}</Container>
          <Container className="flex items-center justify-center gap-x-3 mt-2">
            <hr className="w-100" />
            <span className="text-muted-foreground font-bold">
              @{articleGetter.article?.user}
            </span>
            <hr className="w-100" />
          </Container>
          {id && <BottomSection articleId={id} className="mt-12" />}
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default ArticlePage;
