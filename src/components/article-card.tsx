import { FC, HTMLAttributes } from "react";
import { Article } from "@/lib/api";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="w-60 transition-all duration-300 hover:cursor-pointer hover:bg-muted">
      <CardHeader>
        <CardTitle className="overflow-hidden whitespace-nowrap text-ellipsis leading-tight">
          {article.title}
        </CardTitle>
        <CardDescription>Written by @{article.user}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ArticleCard;
