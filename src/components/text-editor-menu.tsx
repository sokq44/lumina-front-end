import { FC } from "react";
import TextEditorMenuItem from "./text-editor-menu-item";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";

interface TextEditorMenuProps {
  className?: string;
  editor: Editor;
}

const TextEditorMenu: FC<TextEditorMenuProps> = ({ className, editor }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TextEditorMenuItem variant="bold" editor={editor} />
      <TextEditorMenuItem variant="underline" editor={editor} />
      <TextEditorMenuItem variant="italic" editor={editor} />
    </div>
  );
};

export default TextEditorMenu;
