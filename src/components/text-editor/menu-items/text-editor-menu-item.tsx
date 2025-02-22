import { FC } from "react";
import { getMenuItem } from "@/lib/text-editor";
import { useTextEditor } from "@/hooks/text-editor";
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { ContextMenuItemProps } from "@radix-ui/react-context-menu";

interface TextEditorMenuItemProps extends ContextMenuItemProps {
  variant: string;
}

const TextEditorMenuItem: FC<TextEditorMenuItemProps> = ({ variant }) => {
  const textEditor = useTextEditor();

  if (!textEditor.editor) return <span>No Text Editor Was Found.</span>;

  const item = getMenuItem(variant, textEditor.editor);

  if (!item) return <span>Wrong Variant</span>;

  return (
    <ContextMenuItem
      onClick={() => item.toggle()}
      inset
      className="cursor-pointer"
    >
      {item.label}
      <ContextMenuShortcut>
        <item.icon size={14} />
      </ContextMenuShortcut>
    </ContextMenuItem>
  );
};

export default TextEditorMenuItem;
