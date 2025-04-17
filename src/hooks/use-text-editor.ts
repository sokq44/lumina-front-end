import { createContext, useContext } from "react";
import { Article } from "@/lib/api";
import { Editor } from "@tiptap/react";
import { getEmptyArticle } from "@/lib/utils";

export const TextEditorContext = createContext<{
  editor: Editor | undefined;
  article: Article | undefined;
  onSave: (article: Article | undefined) => void;
  onRemove: (article: Article | undefined) => void;
  setArticle: (
    prop: Article | undefined | ((prev: Article | undefined) => Article)
  ) => void;
  getArticle: () => Article;
  finishArticle: () => void;
}>({
  editor: undefined,
  article: undefined,
  onSave: () => {},
  onRemove: () => {},
  setArticle: () => {},
  getArticle: getEmptyArticle,
  finishArticle: () => {},
});

export const useTextEditor = () => {
  const context = useContext(TextEditorContext);
  if (!context) {
    throw new Error("useTextEditor must be used within a TextEditorProvider");
  }
  return context;
};
