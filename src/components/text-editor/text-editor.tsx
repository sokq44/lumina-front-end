import { useEditor } from "@tiptap/react";

import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import BlockQuote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

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
    extensions: [
      Text,
      Bold,
      Italic,
      TaskList,
      TaskItem,
      ListItem,
      Document,
      Paragraph,
      Underline,
      CodeBlock,
      HardBreak,
      BlockQuote,
      BulletList,
      OrderedList,
      HorizontalRule,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    ],
    content: `<p>Contents of your article...<p>`,
  });

  if (!editor) {
    return <div>Error While Creating Editor!</div>;
  }

  return (
    <TextEditorProvider editor={editor} article={article}>
      <div className="flex flex-col h-full mx-4 w-[50rem]">
        <TextEditorMenu />
        <TextEditorContent className="mt-28" />
      </div>
    </TextEditorProvider>
  );
};

export default TextEditor;
