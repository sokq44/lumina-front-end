import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGetArticle } from "@/hooks/articles";
import { useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import SlidingLink from "@/components/sliding-link";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ArticlePage = () => {
  const { toast } = useToast();
  const { state } = useLocation();
  const articleGetter = useGetArticle(state.article);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Retrieving Article",
        description: articleGetter.error,
      });
    }
  }, [articleGetter.error, toast]);

  if (articleGetter.isLoading) {
    return (
      <div className="bg-background flex items-center justify-center h-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center">
      <ThemeSwitch position="top-right" />
      <GoBackArrow position="top-left" />
      <Separator orientation="vertical" />
      <div className="w-[42rem] h-full flex flex-col p-4">
        <div className="flex items-center gap-x-2 mt-4">
          <Avatar className="w-12 h-auto">
            <AvatarImage src="https://cdn2.vectorstock.com/i/1000x1000/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Written by{" "}
            <SlidingLink to="#">@{articleGetter.article?.user}</SlidingLink>
          </span>
        </div>
        <span className="text-4xl font-semibold mt-6 mb-4">
          {articleGetter.article?.title}
        </span>
        <Separator orientation="horizontal" />
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: articleGetter.article?.content || "",
          }}
        />
      </div>
      <Separator orientation="vertical" />
    </div>
  );
};

export default ArticlePage;
