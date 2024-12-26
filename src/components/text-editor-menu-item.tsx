import { FC, useRef } from "react";
import { Button } from "./ui/button";
import { Editor } from "@tiptap/react";
import { getMenuItem } from "@/lib/text-editor";

interface TextEditorMenuItemProps {
  variant: "bold" | "underline" | "italic";
  editor: Editor;
}

const TextEditorMenuItem: FC<TextEditorMenuItemProps> = ({
  variant,
  editor,
}) => {
  const renderRef = useRef(0);
  const item = getMenuItem(variant, editor);

  if (!item) {
    return <div>Wrong Variant</div>;
  }

  const forceUpdate = () => {
    renderRef.current += 1;
  };

  return (
    <Button
      variant={editor.isActive(variant) ? "default" : "ghost"}
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
