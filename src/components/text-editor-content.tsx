import { Editor, EditorContent } from "@tiptap/react";
import { FC, useEffect, useRef } from "react";
import Separator from "./separator";
import SaveButton from "./save-button";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAddArticle } from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface TextEditorContentProps {
  editor: Editor;
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({
  editor,
  className,
}) => {
  const { add, isLoading, error } = useAddArticle();
  const { toast } = useToast();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: error,
      });
    } else if (error === null) navigate("/user/articles");
  }, [error, toast, navigate]);

  const saveChanges = () => {
    const title = titleRef.current?.value;
    const content = editor.getHTML();

    if (title) {
      add(title, content);
    } else {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: "Title must be between 1 and 25 characters long.",
      });
    }
  };

  return (
    <div className={cn("flex flex-col mt-4", className)}>
      <div className="flex items-center">
        <input
          ref={titleRef}
          type="text"
          maxLength={25}
          placeholder="Title"
          className="text-4xl font-semibold bg-transparent w-full ProseMirror"
        />
        <SaveButton
          editor={editor}
          onClick={saveChanges}
          isLoading={isLoading}
        />
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
