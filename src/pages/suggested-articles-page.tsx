import ArticleCard from "@/components/article-card";
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
      <div className="w-full h-full bg-background flex items-center justify-center">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-min grid grid-cols-4 gap-x-12 gap-y-8 m-auto px-4">
      {articles?.map((article, index) => (
        <Link key={`article ${index}`} to="/article" state={{ article }}>
          <ArticleCard article={article} className="max-w-[20rem] shadow-md" />
        </Link>
      ))}
    </div>
  );
};

export default SuggestedArticlesPage;
