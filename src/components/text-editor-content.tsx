import { Editor, EditorContent } from "@tiptap/react";
import { FC } from "react";

interface TextEditorContentProps {
  editor: Editor;
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({
  editor,
  className,
}) => {
  return <EditorContent editor={editor} className={className} />;
};

export default TextEditorContent;
