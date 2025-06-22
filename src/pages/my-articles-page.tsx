import { useEffect } from "react";
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
  const { articles, error, isLoading } = useArticlesGetter();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving the Article",
        description: error,
      });
    }
  }, [error]);

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
        {articles && articles.length > 0 ? (
          <Container className="w-screen h-screen flex flex-col">
            <Container className="w-full h-32 px-12 flex items-end justify-center gap-x-2 mb-8">
              <Container className="w-full flex items-center justify-center">
                <Search className="text-muted-foreground border border-muted h-10 w-10 px-2 rounded-tl-md rounded-bl-md bg-muted" />
                <Input
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
            <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mx-12 justify-center">
              {articles.map((article, index) => (
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
          </Container>
        ) : (
          <Container className="flex flex-col gap-y-2">
            <span className="font-semibold text-muted-foreground text-lg">
              You haven't written anything yet.
            </span>
            <Link
              to={"/writing"}
              state={{ article: undefined }}
              className="w-auto"
            >
              <Button className="flex items-center gap-1 w-full">
                <span>Let's change that</span>
                <PenLine size={16} className="mt-1" />
              </Button>
            </Link>
          </Container>
        )}
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
