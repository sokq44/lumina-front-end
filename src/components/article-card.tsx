import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Article } from "@/lib/api";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, className }) => {
  console.log(article.user_image);

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
            {/* <AvatarImage src="https://cdn2.vectorstock.com/i/1000x1000/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg" /> */}
            <AvatarImage src={article.user_image} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          @{article.user}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <img
          src={article?.banner ? article?.banner : "/default-banner.png"}
          className="w-full h-auto aspect-7/4 rounded-lg brightness-90 shadow-sm group-hover:brightness-[0.75] transition-all duration-300"
        />
      </CardContent>
      <CardFooter className="flex justify-center gap-x-6 text-muted-foreground">
        <Container className="flex items-center gap-x-1">
          <MessageCircle size={20} className="text-muted-foreground" /> 22
        </Container>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
