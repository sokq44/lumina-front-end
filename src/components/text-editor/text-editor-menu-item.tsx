import { FC } from "react";
import { Button } from "@/components/ui/button";
import { getMenuItem } from "@/lib/text-editor";
import { useTextEditor } from "./text-editor-provider";

interface TextEditorMenuItemProps {
  variant:
    | "bold"
    | "italic"
    | "task-list"
    | "underline"
    | "code-block"
    | "block-quote"
    | "bullet-list"
    | "ordered-list"
    | "horizontal-rule";
}

const TextEditorMenuItem: FC<TextEditorMenuItemProps> = ({ variant }) => {
  const textEditor = useTextEditor();

  if (!textEditor.editor) return <div>No Text Editor Was Found.</div>;

  const item = getMenuItem(variant, textEditor.editor);

  if (!item) return <div>Wrong Variant</div>;

  return (
    <Button
      variant={textEditor.editor?.isActive(variant) ? "default" : "ghost"}
      onClick={() => {
        item.toggle();
      }}
      className="p-2 w-9 h-9 hover:bg-secondary hover:text-primary dark:hover:bg-black"
    >
      <item.icon />
    </Button>
  );
};

export default TextEditorMenuItem;
