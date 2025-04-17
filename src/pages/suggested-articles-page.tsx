import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSuggestedArticlesGetter } from "@/hooks/api/articles";
import Container from "@/components/ui/container";
import ArticleCard from "@/components/ui/article-card";
import LoadingScreen from "@/components/wraps/loading-screen";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";

const SuggestedArticlesPage = () => {
  const { toast } = useToast();
  const { articles, isLoading, error } = useSuggestedArticlesGetter();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Articles Retrieval Error",
        description: error || "Something went wrong while retrieving articles.",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <Container className="w-screen h-screen">
        <LoadingScreen>Retrieving Articles...</LoadingScreen>
      </Container>
    );
  }

  return (
    <MediaQuery>
      <More>
        <Container className="h-min grid grid-cols-4 gap-x-12 gap-y-8 m-auto px-4 2xl:grid-cols-5">
          {articles?.map((article, index) => (
            <Link key={`article ${index}`} to="/article" state={{ article }}>
              <ArticleCard
                article={article}
                className="max-w-[20rem] shadow-md"
              />
            </Link>
          ))}
        </Container>
      </More>
      <Less>
        <Container className="w-full flex flex-col items-center gap-y-8 px-2">
          {articles?.map((article, index) => (
            <Link key={`article ${index}`} to="/article" state={{ article }}>
              <ArticleCard article={article} className="w-full shadow-md" />
            </Link>
          ))}
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default SuggestedArticlesPage;
