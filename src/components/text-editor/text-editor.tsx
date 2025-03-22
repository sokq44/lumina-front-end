import { FC } from "react";
import { useEditor } from "@tiptap/react";
import { Article } from "@/lib/api";

import { extensions } from "@/lib/editor-extensions/extensions";

import Container from "@/components/ui/container";
import TextEditorMenu from "@/components/text-editor/text-editor-menu";
import TextEditorContent from "@/components/text-editor/text-editor-content";
import TextEditorProvider from "@/components/text-editor/text-editor-provider";
import EditorDialogueProvider from "@/components/dialogues/editor-dialogue-provider";

interface TextEditorProps {
  article: Article;
}

const TextEditor: FC<TextEditorProps> = ({ article }) => {
  const editor = useEditor({
    extensions: extensions,
    content: "<p>Contents of your article...<p><br />",
  });

  if (!editor) {
    return <span>Error While Creating Editor!</span>;
  }

  return (
    <TextEditorProvider editor={editor} article={article}>
      <EditorDialogueProvider>
        <Container className="w-[50rem] flex flex-col h-full mx-4 mt-6">
          <TextEditorMenu className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[48rem] z-50 text-foreground bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-600" />
          <TextEditorContent className="mt-16" />
        </Container>
      </EditorDialogueProvider>
    </TextEditorProvider>
  );
};

export default TextEditor;
