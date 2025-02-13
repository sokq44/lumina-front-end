import { FC } from "react";
import { getMenuItem } from "@/lib/text-editor";
import { useTextEditor } from "@/hooks/text-editor";
import { Button } from "@/components/ui/button";
import Informative from "@/components/inform-badge/informative";

interface TextEditorMenuItemProps {
  variant: string;
}

const TextEditorMenuItem: FC<TextEditorMenuItemProps> = ({ variant }) => {
  const textEditor = useTextEditor();

  if (!textEditor.editor) return <span>No Text Editor Was Found.</span>;

  const item = getMenuItem(variant, textEditor.editor);

  if (!item) return <span>Wrong Variant</span>;

  return (
    <Informative label={item.label}>
      <Button
        variant={textEditor.editor?.isActive(variant) ? "default" : "ghost"}
        onClick={() => item.toggle()}
        className="p-2 w-9 h-9 hover:bg-secondary hover:text-primary dark:hover:bg-black"
      >
        <item.icon />
      </Button>
    </Informative>
  );
};

export default TextEditorMenuItem;
