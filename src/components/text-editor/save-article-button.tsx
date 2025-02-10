import { Article } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useSaveArticle } from "@/hooks/articles";
import { useTextEditor } from "@/hooks/text-editor";
import { Button } from "@/components/ui/button";
import Informative from "@/components/inform-badge/informative";
import { LoaderCircle, Save } from "lucide-react";

const SaveArticleButton = () => {
  const { toast } = useToast();
  const textEditor = useTextEditor();
  const articleSaver = useSaveArticle(textEditor.article?.id);

  const saveChanges = async () => {
    const title = textEditor.article?.title;
    const content = textEditor.editor?.getHTML();

    if (!title || title.length < 1 || title.length > 25) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: "Title must be between 1 and 25 characters long.",
      });
    } else if (!content || content.length <= 0) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: "Contents of your article musn't be empty.",
      });
    } else {
      const newArticle = {
        ...textEditor.article,
        content: textEditor.editor?.getHTML(),
      } as Article;

      if (newArticle) {
        await articleSaver.save(newArticle);
        toast({
          variant: "success",
          title: "Changes Applied",
          description:
            "All the changes You've made have been applied to the article.",
        });
      }
    }
  };

  return (
    <Informative label="Save Article">
      <Button
        onClick={saveChanges}
        disabled={articleSaver.isLoading}
        className="p-2 w-9 h-9 transition-all duration-300"
      >
        {articleSaver.isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Save />
        )}
      </Button>
    </Informative>
  );
};

export default SaveArticleButton;
