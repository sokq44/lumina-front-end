import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSuggestedArticlesGetter } from "@/hooks/api/articles";
import Container from "@/components/ui/container";
import ArticleCard from "@/components/ui/article-card";
import LoadingScreen from "@/components/wraps/loading-screen";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        <Container className="w-screen h-screen">
          <Container className="w-full h-32 px-12 flex items-end justify-center gap-x-2 mb-8">
            <Container className="w-full flex items-center justify-center">
              <Search className="text-muted-foreground border border-muted h-10 w-10 px-2 rounded-tl-md rounded-bl-md bg-muted" />
              <Input
                placeholder="Search..."
                className="border-l-0 border-muted rounded-none rounded-tr-md rounded-br-md"
              />
            </Container>
          </Container>
          <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mx-12 justify-center">
            {articles?.map((article, index) => (
              <Link key={`article ${index}`} to={`/article/${article.id}`}>
                <ArticleCard
                  article={article}
                  className="max-w-[20rem] shadow-md mx-auto"
                />
              </Link>
            ))}
          </Container>
        </Container>
      </More>
      <Less>
        <Container className="w-screen h-screen flex flex-col gap-y-4 px-4">
          <Container className="w-full flex items-center justify-center mb-2">
            <Search className="text-muted-foreground border border-muted h-10 w-10 px-2 rounded-tl-md rounded-bl-md bg-muted" />
            <Input
              placeholder="Search..."
              className="border-l-0 border-muted rounded-none rounded-tr-md rounded-br-md"
            />
          </Container>
          {articles?.map((article, index) => (
            <Link
              key={`article ${index}`}
              to={`/article/${article.id}`}
              state={{ article }}
            >
              <ArticleCard article={article} className="w-full shadow-md" />
            </Link>
          ))}
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default SuggestedArticlesPage;
