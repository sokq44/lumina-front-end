import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Article } from "@/lib/api";
import Img from "@/components/ui/image";
import { FC, HTMLAttributes } from "react";
import Container from "@/components/ui/container";
import Informative from "@/components/ui/informative";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageCircle, Star } from "lucide-react";

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, className }) => {
  const getAvgRating = () => {
    if (article.ratings.length === 0) return 0;
    let sum = 0;
    for (const rating of article.ratings) sum += rating;
    return sum / article.ratings.length;
  };

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
          <Container className="flex items-center gap-x-4 text-muted-foreground">
            <Container className="flex items-center gap-x-1 text-green-300">
              <Eye className="w-5 h-5" />
              <span>{article.reads}</span>
            </Container>
            <Container className="flex items-center gap-x-1 text-blue-300">
              <MessageCircle className="w-4 h-4" />
              <span>{article.comments}</span>
            </Container>
            <Container className="flex items-center gap-x-1 text-yellow-300">
              <Star className="w-4 h-4" />
              <span>{`${getAvgRating()} (${article.ratings.length})`}</span>
            </Container>
          </Container>
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
