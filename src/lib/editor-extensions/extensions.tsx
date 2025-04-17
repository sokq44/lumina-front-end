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

import ImageExtension from "@/lib/editor-extensions/image-extension";
import YoutubeExtension from "@/lib/editor-extensions/youtube-extenstion";

import type { Extensions } from "@tiptap/react";

export const extensions: Extensions = [
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
  ImageExtension,
  YoutubeExtension,
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
    shouldAutoLink: (url) => url.startsWith("https://"),
  }),
  Table.configure({
    resizable: true,
  }),
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
];
