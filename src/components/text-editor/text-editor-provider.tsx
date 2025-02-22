import { FC, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { Article } from "@/lib/api";
import { TextEditorContext } from "@/hooks/text-editor";

interface TextEditorProviderProps {
  editor: Editor | undefined;
  article: Article | undefined;
  children: React.ReactNode;
}

const TextEditorProvider: FC<TextEditorProviderProps> = ({
  article: initialArticle,
  editor,
  children,
}) => {
  const [article, setArticle] = useState<Article | undefined>(() => {
    if (initialArticle) return initialArticle;

    const temp = localStorage.getItem("curr_article");
    if (!temp || temp === "undefined") return undefined;

    return JSON.parse(temp) as Article;
  });

  const finishArticle = () => {
    localStorage.removeItem("curr_article");
    setArticle(undefined);
  };

  useEffect(() => {
    localStorage.setItem("curr_article", JSON.stringify(article));
  }, [article]);

  return (
    <TextEditorContext.Provider
      value={{ editor, article, setArticle, finishArticle }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};

export default TextEditorProvider;
