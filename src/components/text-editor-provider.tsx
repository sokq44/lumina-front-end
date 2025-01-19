import { createContext, FC, useContext } from "react";
import { Editor } from "@tiptap/react";
import { Article } from "@/lib/api";

const TextEditorContext = createContext<{
  editor: Editor | undefined;
  article: Article | undefined;
}>({
  editor: undefined,
  article: undefined,
});

interface TextEditorProviderProps {
  editor: Editor | undefined;
  article: Article | undefined;
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
