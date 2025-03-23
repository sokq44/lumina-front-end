import { FC, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { Article } from "@/lib/api";
import { TextEditorContext } from "@/hooks/text-editor";

interface TextEditorProviderProps {
  editor: Editor | undefined;
  article: Article | undefined;
  onSave: (article: Article | undefined) => void;
  onRemove: (article: Article | undefined) => void;
  onBannerChange: (file: File | undefined) => void;
  children: React.ReactNode;
}

const TextEditorProvider: FC<TextEditorProviderProps> = ({
  article,
  editor,
  onSave,
  onRemove,
  onBannerChange,
  children,
}) => {
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>(
    () => {
      if (article) return article;

      const temp = localStorage.getItem("curr_article");
      return !temp || temp === "undefined"
        ? undefined
        : (JSON.parse(temp) as Article);
    }
  );

  const finishArticle = () => {
    localStorage.removeItem("curr_article");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", finishArticle);
    return () => {
      window.removeEventListener("beforeunload", finishArticle);
      finishArticle();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("curr_article", JSON.stringify(article));
  }, [article]);

  return (
    <TextEditorContext.Provider
      value={{
        editor: editor,
        article: currentArticle,
        onSave: onSave,
        onRemove: onRemove,
        setArticle: setCurrentArticle,
        onBannerChange: onBannerChange,
        finishArticle: finishArticle,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};

export default TextEditorProvider;
