import { createContext, FC, useContext } from "react";
import { Editor } from "@tiptap/react";
import { Article } from "@/lib/api";

const TextEditorContext = createContext<{
  editor: Editor | null;
  article: Article | null;
}>({
  editor: null,
  article: null,
});

interface TextEditorProviderProps {
  editor: Editor | null;
  article: Article | null;
  children: React.ReactNode;
}

const TextEditorProvider: FC<TextEditorProviderProps> = ({
  editor,
  article,
  children,
}) => {
  return (
    <TextEditorContext.Provider value={{ editor, article }}>
      {children}
    </TextEditorContext.Provider>
  );
};

const useTextEditor = () => {
  return useContext(TextEditorContext);
};

export { TextEditorProvider, useTextEditor };
