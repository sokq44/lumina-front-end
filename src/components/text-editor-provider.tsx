import { createContext, FC, useContext, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { Article } from "@/lib/api";

const TextEditorContext = createContext<{
  editor: Editor | undefined;
  article: Article | undefined;
  setArticle: (article: Article | undefined) => void;
  finishArticle: () => void;
}>({
  editor: undefined,
  article: undefined,
  setArticle: () => {},
  finishArticle: () => {},
});

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

const useTextEditor = () => {
  return useContext(TextEditorContext);
};

export { TextEditorProvider, useTextEditor };
