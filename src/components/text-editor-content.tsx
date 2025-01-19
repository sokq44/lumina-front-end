import { FC, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { EditorContent } from "@tiptap/react";
import { useGetArticle, useSaveArticle } from "@/hooks/articles";
import Separator from "./separator";
import SaveButton from "./save-button";
import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useTextEditor } from "./text-editor-provider";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const { editor, article } = useTextEditor();
  const { toast } = useToast();
  const articleGetter = useGetArticle(article?.id);
  const articleSaver = useSaveArticle(article?.id);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (articleSaver.error) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: articleSaver.error,
      });
    }
  }, [articleSaver.error, toast]);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Rertieving",
        description: articleGetter.error,
      });
    }
  }, [articleGetter.error, toast]);

  useEffect(() => {
    if (articleGetter.article && titleRef.current) {
      titleRef.current.value = articleGetter.article.title;
      editor?.commands.setContent(articleGetter.article.content);
    }
  }, [articleGetter.article]);

  const saveChanges = () => {
    const title = titleRef.current?.value;
    const content = editor?.getHTML();

    if (title && content) {
      articleSaver.save(title, content);
    } else {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: "Title must be between 1 and 25 characters long.",
      });
    }
  };

  if (articleGetter.isLoading) {
    return (
      <div className="bg-background flex items-center justify-center h-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

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
        <SaveButton onClick={saveChanges} isLoading={articleSaver.isLoading} />
      </div>
      <Separator orientation="horizontal" className="mt-2 mb-4" />
      <ScrollArea
        className="h-[48rem] hover:cursor-text"
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent
          editor={editor ?? null}
          className="h-full w-[42rem] mx-auto hover:cursor-text"
        />
      </ScrollArea>
    </div>
  );
};

export default TextEditorContent;
