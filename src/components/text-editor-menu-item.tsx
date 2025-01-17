import { FC, useRef } from "react";
import { Button } from "./ui/button";
import { getMenuItem } from "@/lib/text-editor";
import { useTextEditor } from "./text-editor-provider";

interface TextEditorMenuItemProps {
  variant:
    | "bold"
    | "underline"
    | "italic"
    | "code-block"
    | "block-quote"
    | "bullet-list"
    | "ordered-list"
    | "task-list";
}

const TextEditorMenuItem: FC<TextEditorMenuItemProps> = ({ variant }) => {
  const textEditor = useTextEditor();

  const renderRef = useRef(0);
  const item = textEditor.editor
    ? getMenuItem(variant, textEditor.editor)
    : null;

  if (!item) {
    return <div>Wrong Variant</div>;
  }

  const forceUpdate = () => {
    renderRef.current += 1;
  };

  return (
    <Button
      variant={textEditor.editor?.isActive(variant) ? "default" : "ghost"}
      onClick={() => {
        item.toggle();
        forceUpdate();
      }}
      className="p-2 w-9 h-9"
    >
      <item.icon />
    </Button>
  );
};

export default TextEditorMenuItem;
