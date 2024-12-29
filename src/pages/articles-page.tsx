import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetArticles } from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import { useLoggedIn } from "@/hooks/user";
import { LoaderCircle, PenLine } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ArticlesPage = () => {
  const articlesGetter = useGetArticles();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
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

  useEffect(() => {
    console.log(articlesGetter.articles);
  }, [articlesGetter.articles]);

  if (loggedIn.isLoading || articlesGetter.isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-y-4">
        {articlesGetter.articles && articlesGetter.articles.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            <Link to={"/user/writing"}>
              <Card className="w-60 bg-card-foreground text-card border-0 transition-all duration-300 hover:cursor-pointer hover:bg-card hover:text-card-foreground hover:outline hover:outline-1">
                <CardHeader className="text-inherit">
                  <CardTitle>Create</CardTitle>
                  <CardDescription className="flex items-center text-inherit">
                    <PenLine size={12} className="mr-1" />
                    Write a new article
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            {articlesGetter.articles.map((article, index) => {
              return (
                <Link
                  to={"/article"}
                  state={{ article: article.id }}
                  key={`article ${index}`}
                >
                  <Card className="w-60 transition-all duration-300 hover:cursor-pointer hover:bg-muted">
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        Written by{" "}
                        @{article.user}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="font-semibold text-muted-foreground text-lg">
            You haven't written anything yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
