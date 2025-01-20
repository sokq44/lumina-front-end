import { createContext, FC, useContext, useState } from "react";
import { Editor } from "@tiptap/react";
import { Article } from "@/lib/api";

const TextEditorContext = createContext<{
  editor: Editor | undefined;
  article: Article | undefined;
  setArticle: (article: Article | undefined) => void;
}>({
  editor: undefined,
  article: undefined,
  setArticle: () => {},
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
  const [article, setArticle] = useState<Article | undefined>(initialArticle);

  return (
    <TextEditorContext.Provider value={{ editor, article, setArticle }}>
      {children}
    </TextEditorContext.Provider>
  );
};

const useTextEditor = () => {
  return useContext(TextEditorContext);
};

export { TextEditorProvider, useTextEditor };
