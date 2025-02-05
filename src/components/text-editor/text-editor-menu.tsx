import TextEditorMenuItem from "./text-editor-menu-item";
import { Separator } from "@/components/ui/separator";
import HeadingMenuItem from "./heading-menu-item";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextEditor } from "./text-editor-provider";
import { useToast } from "@/hooks/use-toast";
import { useRemoveArticle, useSaveArticle } from "@/hooks/articles";
import { useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { PrivatePublicSwitch } from "./private-public-switch";

const TextEditorMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const textEditor = useTextEditor();
  const articleSaver = useSaveArticle(textEditor.article?.id);
  const articleRemover = useRemoveArticle();

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
    if (articleRemover.error) {
      toast({
        variant: "destructive",
        title: "Problem With Deleting",
        description: articleRemover.error,
      });
    } else if (articleRemover.error === null) {
      textEditor.finishArticle();
      navigate("/user/articles");
    }
  }, [articleRemover.error, toast, navigate]);

  useEffect(() => {
    if (articleSaver.id) {
      const newArticle = {
        ...textEditor.article,
        id: articleSaver.id,
      } as Article;
      textEditor.setArticle(newArticle);
    }
  }, [articleSaver.id]);

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
    }
  };

  const changeVisibility = async () => {
    const previousArticle = textEditor.article;
    if (previousArticle) {
      const newArticle = {
        ...(previousArticle as Article),
        public: !previousArticle.public,
      };

      textEditor.setArticle(newArticle);
    }
  };

  const removeArticle = async () => {
    const id = textEditor.article?.id;
    if (id) await articleRemover.remove(id);
  };

  return (
    <Collapsible className="my-4 p-2 border border-gray-200 fixed w-[50rem] z-50 bg-muted rounded-md transform transition-all duration-300">
      <div className="flex">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-9 h-auto p-2 mr-2">
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        </CollapsibleTrigger>
        <Separator orientation="vertical" className="h-100" />
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 ml-1">
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
                  disabled={
                    articleSaver.isLoading ||
                    articleRemover.isLoading ||
                    !textEditor.article?.id
                  }
                  className="p-2 w-9 h-9 transition-all duration-300"
                >
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="font-funnel">
                <DialogHeader>
                  <DialogTitle className="text-destructive">
                    Are you sure?
                  </DialogTitle>
                  <DialogDescription>
                    Are you certain that you want to delete this article?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      disabled={articleRemover.isLoading}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      disabled={articleRemover.isLoading}
                      onClick={removeArticle}
                    >
                      {articleSaver.isLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CollapsibleContent className="pl-1 pt-1">
            <div className="flex mb-3">
              <TextEditorMenuItem variant="horizontal-rule" />
              <TextEditorMenuItem variant="hard-break" />
            </div>
            <Dialog>
              <DialogTrigger className="w-full">
                <PrivatePublicSwitch isLoading={articleSaver.isLoading} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    {textEditor.article?.public
                      ? "After you confirm this article is possible to view for every user."
                      : "After you confirm, You will be the only one able to see this article"}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={changeVisibility}>Confirm</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
};

export default TextEditorMenu;
