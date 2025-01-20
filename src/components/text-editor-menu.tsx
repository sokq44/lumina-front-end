import TextEditorMenuItem from "./text-editor-menu-item";
import Separator from "./separator";
import HeadingMenuItem from "./heading-menu-item";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTextEditor } from "./text-editor-provider";
import { useToast } from "@/hooks/use-toast";
import { useSaveArticle } from "@/hooks/articles";
import { useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Article } from "@/lib/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const TextEditorMenu = () => {
  const { toast } = useToast();
  const textEditor = useTextEditor();
  const articleSaver = useSaveArticle(textEditor.article?.id);

  useEffect(() => {
    if (articleSaver.error) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description: articleSaver.error,
      });
    }
  }, [articleSaver.error, toast]);

  const saveChanges = async () => {
    const title = textEditor.article?.title;
    const content = textEditor.editor?.getHTML();

    console.log(content);

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

      if (newArticle) await articleSaver.save(newArticle);

      toast({
        variant: "default",
        title: "Changes Applied",
        description: (
          <div className="text-md flex">
            <span>
              All the changes You've made have been applied to the article.
            </span>
            <Check className="text-green-500" />
          </div>
        ),
      });
    }
  };

  return (
    <Collapsible className="my-4 p-2 border border-gray-200 fixed w-[50rem] z-50 bg-muted rounded-md transition-all duration-300">
      <div className="flex">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-9 h-auto p-2 mr-2">
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        </CollapsibleTrigger>
        <Separator orientation="vertical" className="h-10" />
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
            <Separator orientation="vertical" className="h-10 w-[2px]" />
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={articleSaver.isLoading}
                  className="p-2 w-9 h-9 transition-all duration-300"
                >
                  {articleSaver.isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="font-funnel">
                <DialogHeader>
                  <DialogTitle className="text-destructive">Are you sure?</DialogTitle>
                  <DialogDescription>
                    Are you certain that you want to delete this article?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() => console.log("yes")}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CollapsibleContent></CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
};

export default TextEditorMenu;
