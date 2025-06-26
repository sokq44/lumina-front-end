import { useEffect, useRef } from "react";
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
  const { get, articles, isLoading, error } = useSuggestedArticlesGetter();

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Articles Retrieval Error",
        description: error || "Something went wrong while retrieving articles.",
      });
    }
  }, [error, toast]);

  const search = () => {
    if (searchRef.current) {
      const q = searchRef.current.value.toLowerCase();
      get(q, 50);
    }
  };

  return (
    <MediaQuery>
      <More>
        <Container className="w-screen h-screen">
          <Container className="w-full h-32 px-12 flex items-end justify-center gap-x-2 mb-8">
            <Container className="w-full flex items-center justify-center">
              <Search className="text-muted-foreground border border-muted h-10 w-10 px-2 rounded-tl-md rounded-bl-md bg-muted" />
              <Input
                ref={searchRef}
                onChange={search}
                placeholder="Search..."
                className="border-l-0 border-muted rounded-none rounded-tr-md rounded-br-md"
              />
            </Container>
          </Container>
          {isLoading ? (
            <LoadingScreen className="h-auto mt-32">
              Retrieving Articles...
            </LoadingScreen>
          ) : (
            <Container className="grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mx-12">
              {articles?.map((article, index) => (
                <Link
                  key={`article ${index}`}
                  to={`/article/${article.id}`}
                  className=""
                >
                  <ArticleCard
                    article={article}
                    className="shadow-md mx-auto"
                  />
                </Link>
              ))}
            </Container>
          )}
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
