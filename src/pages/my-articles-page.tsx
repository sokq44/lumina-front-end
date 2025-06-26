import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { PenLine, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "@/components/ui/article-card";
import { useArticlesGetter } from "@/hooks/api/articles";
import LoadingScreen from "@/components/wraps/loading-screen";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";

const MyArticlesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { get, articles, error, isLoading } = useArticlesGetter();

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving the Article",
        description: error,
      });
    }
  }, [error]);

  const search = () => {
    if (searchRef.current) {
      const q = searchRef.current.value.toLowerCase();
      get(q, 50);
    }
  };

  return (
    <MediaQuery>
      <More>
        <Container className="w-screen h-screen flex flex-col">
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
            <Button
              variant="secondary"
              onClick={() =>
                navigate("/writing", { state: { article: undefined } })
              }
            >
              <PenLine size={12} className="mr-1" />
              <span>Write a new article</span>
            </Button>
          </Container>
          {isLoading ? (
            <LoadingScreen className="h-auto mt-32">
              Retrieving Articles...
            </LoadingScreen>
          ) : (
            <Container className="grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mx-12">
              {articles?.map((article, index) => (
                <Link
                  to={"/writing"}
                  state={{ article: article }}
                  key={`article ${index}`}
                >
                  <ArticleCard
                    article={article}
                    className="max-w-[20rem] mx-auto"
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

export default MyArticlesPage;
