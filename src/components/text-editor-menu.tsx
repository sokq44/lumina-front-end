import { FC } from "react";
import TextEditorMenuItem from "./text-editor-menu-item";
import { cn } from "@/lib/utils";
import Separator from "./separator";

interface TextEditorMenuProps {
  className?: string;
}

const TextEditorMenu: FC<TextEditorMenuProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TextEditorMenuItem variant="bold" />
      <TextEditorMenuItem variant="underline" />
      <TextEditorMenuItem variant="italic" />
      <Separator orientation="vertical" />
      <TextEditorMenuItem variant="bullet-list" />
      <TextEditorMenuItem variant="ordered-list" />
      <TextEditorMenuItem variant="task-list" />
      <Separator orientation="vertical" />
      <TextEditorMenuItem variant="code-block" />
      <TextEditorMenuItem variant="block-quote" />
    </div>
  );
};

export default TextEditorMenu;
