import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useArticlesGetter } from "@/hooks/api/articles";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import ArticleCard from "@/components/ui/article-card";
import LoadingScreen from "@/components/wraps/loading-screen";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const MyArticlesPage = () => {
  const { toast } = useToast();
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
        <Container className="flex flex-col items-center justify-center gap-y-8 w-full h-full">
          {articles && articles.length > 0 ? (
            <Container className="grid grid-cols-4 gap-x-12 gap-y-8 items-center px-4 2xl:grid-cols-5">
              <Link
                to={"/writing"}
                state={{ article: undefined }}
                className="h-full"
              >
                <Card className="h-full flex flex-col items-center justify-center bg-card-foreground text-card border-0 transition-all duration-300 cursor-pointer hover:bg-card hover:text-card-foreground hover:outline hover:outline-1">
                  <CardTitle className="text-5xl font-bold">Create</CardTitle>
                  <CardDescription className="flex items-center text-inherit">
                    <PenLine size={12} className="mr-1" />
                    Write a new article
                  </CardDescription>
                </Card>
              </Link>
              {articles.map((article, index) => (
                <Link
                  to={"/writing"}
                  state={{ article: article }}
                  key={`article ${index}`}
                >
                  <ArticleCard article={article} className="max-w-[20rem]" />
                </Link>
              ))}
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
        </Container>
      </More>
      <Less>
        {articles && articles.length > 0 ? (
          <Container className="w-full h-full flex flex-col items-center gap-y-4 px-2">
            {articles.map((article, index) => (
              <Link
                to={"/user/writing"}
                state={{ article: article }}
                key={`article ${index}`}
              >
                <ArticleCard article={article} />
              </Link>
            ))}
          </Container>
        ) : (
          <Container className="h-full flex flex-col justify-center gap-y-2 px-2 ">
            <span className="font-semibold text-muted-foreground text-lg text-center">
              You haven't written anything yet.
            </span>
            <Link
              to={"/user/writing"}
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
      </Less>
    </MediaQuery>
  );
};

export default MyArticlesPage;
