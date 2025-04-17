import { FC, useEffect, useState } from "react";
import { Article } from "@/lib/api";
import { Editor } from "@tiptap/react";
import { TextEditorContext } from "@/hooks/use-text-editor";
import { getEmptyArticle } from "@/lib/utils";

interface TextEditorProviderProps {
  editor: Editor | undefined;
  article: Article | undefined;
  onSave: (article: Article | undefined) => void;
  onRemove: (article: Article | undefined) => void;
  onModify: (article: Article | undefined) => void;
  children: React.ReactNode;
}

const TextEditorProvider: FC<TextEditorProviderProps> = ({
  article,
  editor,
  onSave,
  onRemove,
  onModify,
  children,
}) => {
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>(
    () => {
      if (article) return article;

      const raw = localStorage.getItem("curr_article");
      return !raw || raw === "undefined"
        ? undefined
        : (JSON.parse(raw) as Article);
    }
  );

  const finishArticle = () => {
    localStorage.removeItem("curr_article");
  };

  const getCurrentArticle = () => {
    const raw = localStorage.getItem("curr_article");
    if (raw) {
      const parsed = JSON.parse(raw) as Article;
      if (parsed) {
        return parsed;
      }
    }
    return getEmptyArticle();
  };

  const updateContent = (props: unknown) => {
    const accessableProps = props as { editor: Editor };
    const content = JSON.stringify(accessableProps.editor.getJSON());
    const updated = { ...currentArticle, content } as Article;
    setCurrentArticle(updated);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", finishArticle);
    editor?.on("update", updateContent);
    return () => {
      window.removeEventListener("beforeunload", finishArticle);
      editor?.off("update", updateContent);
      finishArticle();
    };
  }, []);

  useEffect(() => {
    onModify(currentArticle);
    localStorage.setItem("curr_article", JSON.stringify(currentArticle));
  }, [currentArticle]);

  return (
    <TextEditorContext.Provider
      value={{
        editor: editor,
        article: currentArticle,
        onSave: onSave,
        onRemove: onRemove,
        setArticle: setCurrentArticle,
        getArticle: getCurrentArticle,
        finishArticle: finishArticle,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};

export default TextEditorProvider;
