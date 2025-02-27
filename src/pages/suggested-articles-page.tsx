import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSuggestedArticles } from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import Container from "@/components/container";
import ArticleCard from "@/components/article-card";
import { LoaderCircle } from "lucide-react";
import { Less, MediaQuery, More } from "@/components/media-query";

const SuggestedArticlesPage = () => {
  const { toast } = useToast();
  const { articles, isLoading, error } = useGetSuggestedArticles();

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
      <Container className="w-full h-full bg-background flex items-center justify-center text-muted-foreground">
        <LoaderCircle size={24} className="animate-spin" />
        <span className="ml-2 text-lg">Retrieving articles...</span>
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
