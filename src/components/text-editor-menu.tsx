import TextEditorMenuItem from "./text-editor-menu-item";
import Separator from "./separator";
import HeadingMenuItem from "./heading-menu-item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

const TextEditorMenu = () => {
  return (
    <Collapsible className="my-4 p-2 border border-gray-200 rounded-md sticky transition-all duration-300">
      <div className="flex">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-9 h-auto p-2 mr-2">
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        </CollapsibleTrigger>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <TextEditorMenuItem variant="bold" />
            <TextEditorMenuItem variant="underline" />
            <TextEditorMenuItem variant="italic" />
            <TextEditorMenuItem variant="bullet-list" />
            <TextEditorMenuItem variant="ordered-list" />
            <TextEditorMenuItem variant="task-list" />
            <TextEditorMenuItem variant="code-block" />
            <TextEditorMenuItem variant="block-quote" />
            <HeadingMenuItem />
          </div>
          <CollapsibleContent></CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
};

export default TextEditorMenu;
