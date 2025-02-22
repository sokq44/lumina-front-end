import { FC } from "react";
import { useTextEditor } from "@/hooks/text-editor";
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { ContextMenuItemProps } from "@radix-ui/react-context-menu";

interface HeadingMenuItemProps extends ContextMenuItemProps {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const icons = [
  <Heading1 size={14} />,
  <Heading2 size={14} />,
  <Heading3 size={14} />,
  <Heading4 size={14} />,
  <Heading5 size={14} />,
  <Heading6 size={14} />,
];

const HeadingMenuItem: FC<HeadingMenuItemProps> = ({ level }) => {
  const textEditor = useTextEditor();

  const handleSelection = () => {
    if (!textEditor.editor || level === 0) return;
    textEditor.editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <ContextMenuItem
      onSelect={handleSelection}
      inset
      className="cursor-pointer"
    >
      Header {level}
      <ContextMenuShortcut>{icons[level - 1]}</ContextMenuShortcut>
    </ContextMenuItem>
  );
};

export default HeadingMenuItem;
