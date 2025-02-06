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
    | "hard-break"
    | "block-quote"
    | "bullet-list"
    | "ordered-list"
    | "insert-table"
    | "horizontal-rule"
    | "merge-table-cells"
    | "delete-table"
    | "insert-column-before"
    | "insert-column-after"
    | "delete-column"
    | "insert-row-before"
    | "insert-row-after"
    | "delete-row"
    | "split-table-cell"
    | "toggle-header-column"
    | "toggle-header-row"
    | "toggle-header-cell"
    | "go-to-next-cell"
    | "go-to-previous-cell";
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
