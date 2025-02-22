import { FC, ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuSub,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import HeadingMenuItem from "@/components/text-editor/menu-items/heading-menu-item";
import TextEditorMenuItem from "@/components/text-editor/menu-items/text-editor-menu-item";

interface EditorToolbarProps {
  children: ReactNode;
}

const EditorToolbar: FC<EditorToolbarProps> = ({ children }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52 font-funnel">
        <TextEditorMenuItem variant="paragraph" />
        <TextEditorMenuItem variant="bold" />
        <TextEditorMenuItem variant="underline" />
        <TextEditorMenuItem variant="italic" />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset className="cursor-pointer">
            Header
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-52 ml-2">
            <HeadingMenuItem level={1} />
            <HeadingMenuItem level={2} />
            <HeadingMenuItem level={3} />
            <HeadingMenuItem level={4} />
            <HeadingMenuItem level={5} />
            <HeadingMenuItem level={6} />
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset className="cursor-pointer">
            Lists
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-52 ml-2">
            <TextEditorMenuItem variant="bullet-list" />
            <TextEditorMenuItem variant="ordered-list" />
            <TextEditorMenuItem variant="task-list" />
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset className="cursor-pointer">
            Table
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-64 ml-2">
            <TextEditorMenuItem variant="insert-table" />
            <TextEditorMenuItem variant="delete-table" />
            <ContextMenuSeparator />
            <TextEditorMenuItem variant="insert-column-before" />
            <TextEditorMenuItem variant="insert-column-after" />
            <TextEditorMenuItem variant="delete-column" />
            <ContextMenuSeparator />
            <TextEditorMenuItem variant="insert-row-before" />
            <TextEditorMenuItem variant="insert-row-after" />
            <TextEditorMenuItem variant="delete-row" />
            <ContextMenuSeparator />
            <TextEditorMenuItem variant="merge-table-cells" />
            <TextEditorMenuItem variant="split-table-cell" />
            <ContextMenuSeparator />
            <TextEditorMenuItem variant="toggle-header-column" />
            <TextEditorMenuItem variant="toggle-header-row" />
            <TextEditorMenuItem variant="toggle-header-cell" />
            <ContextMenuSeparator />
            <TextEditorMenuItem variant="go-to-next-cell" />
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <TextEditorMenuItem variant="block-quote" />
        <TextEditorMenuItem variant="code-block" />
        <TextEditorMenuItem variant="horizontal-rule" />
        <TextEditorMenuItem variant="hard-break" />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EditorToolbar;
