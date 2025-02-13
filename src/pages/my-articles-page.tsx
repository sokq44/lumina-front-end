import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedIn } from "@/hooks/user";
import { useToast } from "@/hooks/use-toast";
import { useGetArticles } from "@/hooks/articles";
import Container from "@/components/container";
import ArticleCard from "@/components/article-card";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LoaderCircle, PenLine } from "lucide-react";
import { Less, MediaQuery, More } from "@/components/media-query";
import { Button } from "@/components/ui/button";

const MyArticlesPage = () => {
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const articlesGetter = useGetArticles();
  const { toast } = useToast();

  useEffect(() => {
    if (loggedIn.error) navigate("/login");
  }, [loggedIn.error, navigate]);

  useEffect(() => {
    if (articlesGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: articlesGetter.error,
      });
    }
  }, [articlesGetter.error, toast, navigate]);

  if (loggedIn.isLoading || articlesGetter.isLoading) {
    return (
      <Container className="flex items-center justify-center h-full w-full">
        <LoaderCircle size={24} className="animate-spin" />
      </Container>
    );
  }

  return (
    <MediaQuery>
      <More>
        <Container className="flex flex-col items-center justify-center gap-y-8 w-full h-full">
          {articlesGetter.articles && articlesGetter.articles.length > 0 ? (
            <Container className="grid grid-cols-4 gap-x-12 gap-y-8 items-center px-4">
              <Link
                to={"/user/writing"}
                state={{ article: undefined }}
                className="h-full"
              >
                <Card className="h-full flex flex-col items-center justify-center bg-card-foreground text-card border-0 transition-all duration-300 hover:cursor-pointer hover:bg-card hover:text-card-foreground hover:outline hover:outline-1">
                  <CardTitle className="text-5xl font-bold">Create</CardTitle>
                  <CardDescription className="flex items-center text-inherit">
                    <PenLine size={12} className="mr-1" />
                    Write a new article
                  </CardDescription>
                </Card>
              </Link>
              {articlesGetter.articles.map((article, index) => (
                <Link
                  to={"/user/writing"}
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
        </Container>
      </More>
      <Less>
        {articlesGetter.articles && articlesGetter.articles.length > 0 ? (
          <Container className="w-full h-full flex flex-col items-center gap-y-4 px-2">
            {articlesGetter.articles.map((article, index) => (
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
