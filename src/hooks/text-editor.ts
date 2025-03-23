import { createContext, useContext } from "react";
import { Article } from "@/lib/api";
import { Editor } from "@tiptap/react";

export const TextEditorContext = createContext<{
  editor: Editor | undefined;
  article: Article | undefined;
  onSave: (article: Article | undefined) => void;
  onRemove: (article: Article | undefined) => void;
  onBannerChange: (file: File | undefined) => void;
  setArticle: (article: Article | undefined) => void;
  finishArticle: () => void;
}>({
  editor: undefined,
  article: undefined,
  onSave: () => {},
  onRemove: () => {},
  onBannerChange: () => {},
  setArticle: () => {},
  finishArticle: () => {},
});

export const useTextEditor = () => useContext(TextEditorContext);
