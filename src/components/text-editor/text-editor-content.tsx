import { FC, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { EditorContent } from "@tiptap/react";
import { useGetArticle } from "@/hooks/articles";
import { Separator } from "@/components/ui/separator";
import { LoaderCircle } from "lucide-react";
import { useTextEditor } from "./text-editor-provider";
import { Article } from "@/lib/api";
import { Link } from "react-router-dom";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const textEditor = useTextEditor();
  const articleGetter = useGetArticle(textEditor.article?.id);
  const { toast } = useToast();

  const titleRef = useRef<HTMLInputElement>(null);

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
      textEditor.editor?.commands.setContent(articleGetter.article.content);
      textEditor.setArticle(articleGetter.article);
    }
  }, [articleGetter.article]);

  const changeTitle = () => {
    if (titleRef.current) {
      const newArticle = {
        ...textEditor.article,
        title: titleRef.current.value,
      } as Article;
      if (newArticle) textEditor.setArticle(newArticle);
    }
  };

  const focusEditor = () => {
    textEditor.editor?.commands.focus();
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
      <div className="flex flex-col">
        <input
          ref={titleRef}
          type="text"
          maxLength={25}
          placeholder="Title"
          className="text-4xl font-semibold bg-transparent w-full ProseMirror"
          onInput={changeTitle}
        />
        {textEditor.article?.user && (
          <Link
            to={`/user/${textEditor.article?.user}`}
            className="w-min text-sm text-muted-foreground sliding-link"
          >
            By&nbsp;@{textEditor.article?.user}
          </Link>
        )}
      </div>
      <Separator orientation="horizontal" className="mt-2 mb-4" />
      <EditorContent
        onClick={focusEditor}
        editor={textEditor.editor ?? null}
        className="min-h-svh w-full mx-auto hover:cursor-text"
      />
    </div>
  );
};

export default TextEditorContent;
