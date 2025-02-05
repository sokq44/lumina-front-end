import { FC, HTMLAttributes } from "react";
import { Article } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, className }) => {
  return (
    <Card
      className={cn(
        "group transition-all duration-300 hover:cursor-pointer hover:bg-muted",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis mx-1">
          {article.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-x-1">
          <Avatar className="w-8 h-auto col-auto my-auto shadow-md">
            <AvatarImage src="https://cdn2.vectorstock.com/i/1000x1000/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          @{article.user}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <img
          src={article?.banner ? article?.banner : "/dummy-banner.webp"}
          className="w-full h-auto aspect-7/4 rounded-lg brightness-90 shadow-sm group-hover:brightness-[0.75] transition-all duration-300"
        />
      </CardContent>
      <CardFooter className="flex justify-center gap-x-6 text-muted-foreground">
        <div className="flex items-center gap-x-1">
          <MessageCircle size={20} className="text-muted-foreground" /> 22
        </div>
        <div className="flex items-center gap-x-1">
          <ThumbsUp size={20} className="text-muted-foreground" /> 21
        </div>
        <div className="flex items-center gap-x-1">
          <ThumbsDown size={20} className="text-muted-foreground" /> 13
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
