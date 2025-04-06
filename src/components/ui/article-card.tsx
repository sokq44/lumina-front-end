import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Article } from "@/lib/api";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Img from "@/components/ui/image";
import Informative from "@/components/ui/informative";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, className }) => {
  return (
    <Informative label={article.title}>
      <Card
        className={cn(
          "group transition-all duration-300 cursor-pointer hover:bg-muted",
          className
        )}
      >
        <CardHeader>
          <CardTitle className="w-full text-2xl overflow-hidden line-clamp-1 text-ellipsis break-all">
            {article.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-x-1">
            <Avatar className="w-8 h-auto col-auto my-auto shadow-md">
              <AvatarImage src={article.user_image} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            @{article.user}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <Img
            src={article?.banner ? article?.banner : "/default-banner.png"}
            className="w-full h-auto aspect-7/4 rounded-lg brightness-90 shadow-sm group-hover:brightness-[0.75] transition-all duration-300"
          />
        </CardContent>
      </Card>
    </Informative>
  );
};

export default ArticleCard;
