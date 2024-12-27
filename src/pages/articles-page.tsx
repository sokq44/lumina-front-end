import GoBackArrow from "@/components/go-back-arrow";
import ThemeSwitch from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { useGetArticles } from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import { useLoggedIn } from "@/hooks/user";
import { LoaderCircle, SquarePen } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  if (loggedIn.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  if (articlesGetter.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <ThemeSwitch position="top-right" />
        <GoBackArrow to="/user" />
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <ThemeSwitch position="top-right" />
      <GoBackArrow to="/user" />
      <div className="flex flex-col items-center gap-y-4">
        {articlesGetter.articles && articlesGetter.articles.length > 0 ? (
          <div className="flex">
            {articlesGetter.articles.map((article) => {
              return JSON.stringify(article);
            })}
          </div>
        ) : (
          <p className="font-semibold text-muted-foreground text-lg">
            You haven't written anything yet.
          </p>
        )}
        <Button className="w-full" onClick={() => navigate("/user/writing")}>
          Write <SquarePen className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ArticlesPage;
