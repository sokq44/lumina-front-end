import GoBackArrow from "@/components/go-back-arrow";
import SlidingLink from "@/components/sliding-link";
import ThemeSwitch from "@/components/theme-switch";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetArticle } from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ArticlePage = () => {
  const { state } = useLocation();
  const { toast } = useToast();
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
      <GoBackArrow />
      <Separator className="bg-gray-200 w-[1px] h-full" />
      <div className="w-[42rem] h-full flex flex-col p-4">
        <div className="flex items-center gap-x-2">
          <Avatar className="w-12 h-auto">
            <AvatarImage src="https://cdn2.vectorstock.com/i/1000x1000/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Written by{" "}
            <SlidingLink to="#">@{articleGetter.article?.user}</SlidingLink>
          </span>
        </div>
        <span className="text-4xl font-semibold mt-4">
          {articleGetter.article?.title}
        </span>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: articleGetter.article?.content || "",
          }}
        />
        <Separator orientation="horizontal" />
      </div>
      <Separator className="bg-gray-200 w-[1px] h-full" />
    </div>
  );
};

export default ArticlePage;
