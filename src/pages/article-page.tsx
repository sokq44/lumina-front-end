import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useGetArticle } from "@/hooks/articles";
import Container from "@/components/container";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoaderCircle } from "lucide-react";

const ArticlePage = () => {
  const { toast } = useToast();
  const { state } = useLocation();
  const articleGetter = useGetArticle(state.article.id);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Article",
        description: articleGetter.error,
      });
    }
  }, [articleGetter.error, toast]);

  if (articleGetter.isLoading) {
    return (
      <Container className="bg-background flex items-center justify-center h-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </Container>
    );
  }

  const formattedDate = articleGetter.article?.created_at
    ? new Date(articleGetter.article.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <Container className="w-screen h-screen flex justify-center">
      <ThemeSwitch position="top-right" />
      <GoBackArrow position="top-left" />
      <Container className="w-[50rem] h-full flex flex-col p-4">
        <img
          src={
            articleGetter.article?.banner
              ? articleGetter.article?.banner
              : "/default-banner.png"
          }
          className="w-full h-auto aspect-7/4 my-8 rounded-lg brightness-90 shadow-md"
        />
        <Container className="flex items-center gap-x-2 my-6">
          <Avatar className="w-16 h-auto shadow-md">
            <AvatarImage src="https://cdn2.vectorstock.com/i/1000x1000/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg" />
            <AvatarFallback>U</AvatarFallback>
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
              on the {formattedDate}
            </span>
          </Container>
        </Container>
        <Container
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: articleGetter.article?.content || "",
          }}
        />
      </Container>
    </Container>
  );
};

export default ArticlePage;
