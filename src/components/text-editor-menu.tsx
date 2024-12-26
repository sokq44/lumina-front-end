import { FC } from "react";
import TextEditorMenuItem from "./text-editor-menu-item";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import SaveButton from "./save-button";

interface TextEditorMenuProps {
  className?: string;
  editor: Editor;
}

const TextEditorMenu: FC<TextEditorMenuProps> = ({ className, editor }) => {
  return (
    <div className={cn("flex gap-2 p-2", className)}>
      <TextEditorMenuItem variant="bold" editor={editor} />
      <TextEditorMenuItem variant="underline" editor={editor} />
      <TextEditorMenuItem variant="italic" editor={editor} />
      <div className="w-full"></div>
      <SaveButton editor={editor} />
    </div>
  );
};

export default TextEditorMenu;
