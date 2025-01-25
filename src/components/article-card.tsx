import { FC, HTMLAttributes } from "react";
import { Article } from "@/lib/api";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="transition-all duration-300 hover:cursor-pointer hover:bg-muted">
      <CardHeader>
        <CardTitle className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {article.title}
        </CardTitle>
        <CardDescription>
          Written by{" "}
          <Link
            to={`/user/${article.user}`}
            className="sliding-link font-semibold"
          >
            @{article.user}
          </Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ArticleCard;
