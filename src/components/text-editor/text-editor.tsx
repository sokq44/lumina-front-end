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
import Youtube from "@tiptap/extension-youtube";
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

import Container from "@/components/ui/container";
import TextEditorMenu from "@/components/text-editor/text-editor-menu";
import TextEditorContent from "@/components/text-editor/text-editor-content";
import TextEditorProvider from "@/components/text-editor/text-editor-provider";
import EditorDialogueProvider from "@/components/dialogues/editor-dialogue-provider";

// TODO: resizable images
// TODO: resizable youtube videos
// TODO: dialog for setting a link
// TODO: cursor change for resizing tables
// TODO: tracking changes within an article
// TODO: define prohibited protocols and urls for the Link extension
// TODO: more user-friendly process of uploading pictures, banner image and profile image (lazy loading)

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
      Youtube.configure({
        nocookie: true,
      }),
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
    content: `<span>Contents of your article...<span>`,
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
