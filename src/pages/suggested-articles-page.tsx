import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSuggestedArticles } from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SuggestedArticlesPage = () => {
  const { toast } = useToast();
  const { articles, isLoading, error } = useGetSuggestedArticles();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Articles",
        description: error,
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="bg-background flex items-center justify-center h-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {articles?.map((article) => (
        <Link to="/article" state={{ article }}>
          <Card className="w-60 whitespace-nowrap transform transition-all duration-300 hover:w-96 hover:whitespace-pre hover:cursor-pointer hover:bg-muted">
            <CardHeader>
              <CardTitle className="overflow-hidden text-ellipsis leading-tight">
                {article.title}
              </CardTitle>
              <CardDescription>
                Written By{" "}
                <Link
                  className="sliding-link font-semibold"
                  to={`/user/${article.user}`}
                >
                  @{article.user}
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SuggestedArticlesPage;
