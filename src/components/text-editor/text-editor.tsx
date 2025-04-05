import { FC } from "react";
import { useEditor } from "@tiptap/react";
import { Article } from "@/lib/api";
import { extensions } from "@/lib/editor-extensions/extensions";
import Container from "@/components/ui/container";
import TextEditorMenu from "@/components/text-editor/text-editor-menu";
import DialogueProvider from "@/components/dialogues/dialogue-provider";
import TextEditorContent from "@/components/text-editor/text-editor-content";
import TextEditorProvider from "@/components/text-editor/text-editor-provider";

interface TextEditorProps {
  article: Article | undefined;
  onSave: (aticle: Article | undefined) => void;
  onRemove: (article: Article | undefined) => void;
}

const TextEditor: FC<TextEditorProps> = ({ article, onSave, onRemove }) => {
  const editor = useEditor({
    extensions: extensions,
    content: "<p>Contents of your article...<p><br />",
  });

  if (!editor) {
    return <span>Error While Creating Editor!</span>;
  }

  return (
    <TextEditorProvider
      editor={editor}
      article={article}
      onSave={onSave}
      onRemove={onRemove}
    >
      <DialogueProvider>
        <Container className="w-[50rem] flex flex-col h-full mx-4 mt-6">
          <TextEditorMenu className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[48rem] z-50 text-foreground bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-600" />
          <TextEditorContent className="mt-16" />
        </Container>
      </DialogueProvider>
    </TextEditorProvider>
  );
};

export default TextEditor;
