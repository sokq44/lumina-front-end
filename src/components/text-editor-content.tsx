import { Editor, EditorContent } from "@tiptap/react";
import { FC, useRef } from "react";
import Separator from "./separator";
import SaveButton from "./save-button";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface TextEditorContentProps {
  editor: Editor;
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({
  editor,
  className,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);

  const onSaveChanges = () => {
    const title = titleRef.current?.value;
    const content = editor.getHTML();
    console.log({ title, content });
  };

  return (
    <div className={cn("flex flex-col mt-4", className)}>
      <div className="flex items-center">
        <input
          ref={titleRef}
          type="text"
          maxLength={25}
          placeholder="Title"
          className="text-4xl bg-transparent w-full ProseMirror"
        />
        <SaveButton editor={editor} onClick={onSaveChanges} />
      </div>
      <Separator orientation="horizontal" className="mt-2 mb-4" />
      <ScrollArea
        className="h-[48rem] hover:cursor-text"
        onClick={() => editor.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="h-full w-[42rem] mx-auto hover:cursor-text"
        />
      </ScrollArea>
    </div>
  );
};

export default TextEditorContent;
