import { useEditor } from "@tiptap/react";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block";
import Separator from "./separator";
import TextEditorMenu from "./text-editor-menu";
import TextEditorContent from "./text-editor-content";
import { FC } from "react";
import { TextEditorProvider } from "./text-editor-provider";
import { Article } from "@/lib/api";

interface TextEditorProps {
  article: Article;
}

const TextEditor: FC<TextEditorProps> = ({ article }) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Underline, Bold, Italic, CodeBlock],
    content: `<p>Contents of your article...<p>`,
  });

  if (!editor) {
    return <div>Error While Creating Editor!</div>;
  }

  return (
    <TextEditorProvider editor={editor} article={article}>
      <div className="h-full flex">
        <Separator orientation="vertical" />
        <div className="flex flex-col h-full mx-4 w-[42rem]">
          <TextEditorMenu className="h-14 my-4 px-2 border border-gray-200 rounded-md sticky" />
          <TextEditorContent />
        </div>
        <Separator orientation="vertical" />
      </div>
    </TextEditorProvider>
  );
};

export default TextEditor;
