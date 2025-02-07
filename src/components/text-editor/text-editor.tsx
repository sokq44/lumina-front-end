import { FC } from "react";
import { useEditor } from "@tiptap/react";
import { Article } from "@/lib/api";

import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import ListItem from "@tiptap/extension-list-item";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import BlockQuote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import TableHeader from "@tiptap/extension-table-header";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import TextEditorMenu from "@/components/text-editor/text-editor-menu";
import TextEditorContent from "@/components/text-editor/text-editor-content";
import TextEditorProvider from "@/components/text-editor/text-editor-provider";

// TODO: define prohibited protocols and urls for the Link extension
// TODO: check whether certain text editor menu items can be triggered
// TODO: resizable images
// TODO: dialog for setting a link

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
      TableRow,
      TableCell,
      Paragraph,
      Underline,
      CodeBlock,
      HardBreak,
      BlockQuote,
      BulletList,
      TableHeader,
      OrderedList,
      HorizontalRule,
      Image.configure({
        HTMLAttributes: {
          class: "tip-tap-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tip-tap-link",
        },
      }),
      Table.configure({
        resizable: true,
      }),
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
