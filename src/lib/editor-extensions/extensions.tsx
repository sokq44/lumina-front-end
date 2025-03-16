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

import ImageExtension from "@/lib/editor-extensions/image-extension";

import type { Extensions } from "@tiptap/react";
import { DOMNode, Element } from "html-react-parser";
import ImageNodeView from "@/components/node-views/image-node-view";

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
];

export function extensionToElement(node: DOMNode) {
  const element = node as unknown as Element;
  if (element.name === "image-extension") {
    return <ImageNodeView />;
  }
}
