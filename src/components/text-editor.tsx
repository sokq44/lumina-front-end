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

const TextEditor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Underline, Bold, Italic, CodeBlock],
    content: `<p>Contents of your article...<p>`,
  });

  if (!editor) {
    return <div>Error While Creating Editor!</div>;
  }

  return (
    <div className="h-full flex">
      <Separator orientation="vertical" />
      <div className="flex flex-col h-full mx-4 w-[42rem]">
        <TextEditorMenu
          editor={editor}
          className="h-14 my-4 px-2 border border-gray-200 rounded-md sticky"
        />
        <TextEditorContent editor={editor} />
      </div>
      <Separator orientation="vertical" />
    </div>
  );
};

export default TextEditor;
