import { useEffect } from "react";
import { useLoggedIn } from "@/hooks/user";
import { useToast } from "@/hooks/use-toast";
import { useGetArticles } from "@/hooks/articles";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle, PenLine } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleCard from "@/components/article-card";

const ArticlesPage = () => {
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
      <div className="flex items-center justify-center h-full w-full">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center gap-y-8 h-full">
        <span className="text-4xl font-semibold">My Articles</span>
        {articlesGetter.articles && articlesGetter.articles.length > 0 ? (
          <div className="grid grid-cols-5 gap-4 place-items-center">
            <Link to={"/user/writing"} state={{ article: undefined }}>
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
            {articlesGetter.articles.map((article, index) => (
              <Link
                to={"/user/writing"}
                state={{ article: article }}
                key={`article ${index}`}
              >
                <ArticleCard article={article} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center font-semibold text-muted-foreground text-lg">
            <span>You haven't written anything yet.</span>
            <Link
              to={"/user/writing"}
              state={{ article: undefined }}
              className="w-auto"
            >
              <div className="flex items-center gap-1 sliding-link w-auto">
                <span>Let's change that</span>
                <PenLine size={16} className="mt-1" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
