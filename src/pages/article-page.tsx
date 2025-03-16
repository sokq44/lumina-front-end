import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatDate, getArticleContent } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Container from "@/components/ui/container";
import { useGetArticle } from "@/hooks/articles";
import { Badge } from "@/components/ui/badge";
import ThemeSwitch from "@/components/theme/theme-switch";
import GoBackArrow from "@/components/ui/go-back-arrow";
import LoadingScreen from "@/components/wraps/loading-screen";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { generateHTML } from "@tiptap/react";
import {
  extensions,
  extensionToElement,
} from "@/lib/editor-extensions/extensions";
import parse from "html-react-parser";

const ArticlePage = () => {
  const { toast } = useToast();
  const { state } = useLocation();
  const { article, isLoading, error } = useGetArticle(state.article.id);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Article",
        description: error,
      });
    }
  }, [error, toast]);

  const getContent = () => {
    const html = generateHTML(getArticleContent(article), extensions);
    return parse(html, { replace: (node) => extensionToElement(node) });
  };

  if (isLoading) {
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
            <img
              src={article?.banner ? article?.banner : "/default-banner.png"}
              className="w-full h-auto aspect-7/4 my-8 rounded-lg brightness-90 shadow-md"
            />
            <Container className="flex items-center gap-x-2 my-6">
              <Avatar className="w-16 h-auto shadow-md">
                <AvatarImage src={article?.user_image} />
                <AvatarFallback>{article?.user[0]}</AvatarFallback>
              </Avatar>
              <Container className="flex flex-col items-start gap-y-1">
                <span className="text-5xl font-bold">{article?.title}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  Written by{" "}
                  <Link
                    className="sliding-link font-semibold"
                    to={`/user/${article?.user}`}
                  >
                    @{article?.user}
                  </Link>{" "}
                  on the {formatDate(article?.created_at)}
                </span>
              </Container>
            </Container>
            <Container className="mt-4">{getContent()}</Container>
          </Container>
        </Container>
      </More>
      <Less>
        <ThemeSwitch position="top-right" />
        <GoBackArrow position="top-left" />
        <Container className="w-full pt-16 px-2">
          <img
            src={article?.banner ? article?.banner : "/default-banner.png"}
            className="w-full h-auto aspect-7/4 rounded-lg brightness-90 shadow-md"
          />
          <Container className="flex items-center gap-x-2 my-4">
            <Avatar className="w-14 h-auto shadow-md">
              <AvatarImage src={article?.user_image} />
              <AvatarFallback>{article?.user[0]}</AvatarFallback>
            </Avatar>
            <Container className="flex flex-col items-start gap-y-1">
              <span className="text-xl sm:text-4xl font-bold">
                {article?.title}
              </span>
              <span className="text-sm text-muted-foreground">
                Written by{" "}
                <Link
                  className="sliding-link font-semibold"
                  to={`/user/${article?.user}`}
                >
                  <Badge
                    variant="secondary"
                    className="px-1 text-muted-foreground"
                  >
                    @{article?.user}
                  </Badge>
                </Link>{" "}
                on the {formatDate(article?.created_at)}
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
