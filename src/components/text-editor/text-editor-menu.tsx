import { useEffect } from "react";
import { Article } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useTextEditor } from "@/hooks/text-editor";
import { useRemoveArticle, useSaveArticle } from "@/hooks/articles";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Informative from "@/components/inform-badge/informative";
import ImageUploader from "@/components/text-editor/image-uploader";
import HeadingMenuItem from "@/components/text-editor/heading-menu-item";
import YoutubeMenuItem from "@/components/text-editor/youtube-menu-item";
import TextEditorMenuItem from "@/components/text-editor/text-editor-menu-item";
import {
  BookCheck,
  BookLock,
  ChevronsUpDown,
  Info,
  LoaderCircle,
  Save,
  Trash2,
} from "lucide-react";

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
          variant: "success",
          title: "Changes Applied",
          description:
            "All the changes You've made have been applied to the article.",
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
    <Collapsible className="my-4 p-2 border border-gray-200 fixed w-[50rem] z-10 bg-muted rounded-md transform transition-all duration-300">
      <div className="flex">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-9 h-auto p-2 mr-2">
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        </CollapsibleTrigger>
        <Separator orientation="vertical" className="h-100" />
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 ml-1 pr-2">
            <TextEditorMenuItem variant="paragraph" />
            <TextEditorMenuItem variant="bold" />
            <TextEditorMenuItem variant="underline" />
            <TextEditorMenuItem variant="italic" />
            <TextEditorMenuItem variant="bullet-list" />
            <TextEditorMenuItem variant="ordered-list" />
            <TextEditorMenuItem variant="task-list" />
            <TextEditorMenuItem variant="code-block" />
            <TextEditorMenuItem variant="block-quote" />
            <TextEditorMenuItem variant="horizontal-rule" />
            <TextEditorMenuItem variant="hard-break" />
            <HeadingMenuItem />
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
            <Dialog>
              <Informative label="Delete Article">
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
              </Informative>
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
          <CollapsibleContent className="flex flex-col pl-1 pt-1 pr-2">
            <div className="flex gap-2">
              <TextEditorMenuItem variant="insert-table" />
              <TextEditorMenuItem variant="delete-table" />
              <TextEditorMenuItem variant="insert-column-before" />
              <TextEditorMenuItem variant="insert-column-after" />
              <TextEditorMenuItem variant="delete-column" />
              <TextEditorMenuItem variant="insert-row-before" />
              <TextEditorMenuItem variant="insert-row-after" />
              <TextEditorMenuItem variant="delete-row" />
              <TextEditorMenuItem variant="merge-table-cells" />
              <TextEditorMenuItem variant="split-table-cell" />
              <TextEditorMenuItem variant="toggle-header-column" />
              <TextEditorMenuItem variant="toggle-header-row" />
              <TextEditorMenuItem variant="toggle-header-cell" />
              <TextEditorMenuItem variant="go-to-next-cell" />
              <Dialog>
                <Informative
                  className="ml-auto"
                  label={`Change To ${
                    textEditor.article?.public ? "Private" : "Public"
                  }`}
                >
                  <DialogTrigger asChild>
                    <Button
                      disabled={
                        articleSaver.isLoading ||
                        articleRemover.isLoading ||
                        !textEditor.article?.id
                      }
                      className="p-2 w-9 h-9 transition-all duration-300"
                    >
                      {textEditor.article?.public ? (
                        <BookCheck />
                      ) : (
                        <BookLock size={20} />
                      )}
                    </Button>
                  </DialogTrigger>
                </Informative>
                <DialogContent className="font-funnel">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      {textEditor.article?.public
                        ? "After you confirm and save, You will be the only one able to see this article."
                        : "After you confirm and save, this article will be possible to view for every user."}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={changeVisibility}>Confirm</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <Informative label="Help">
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="p-2 w-9 h-9 transition-all duration-300"
                    >
                      <Info />
                    </Button>
                  </DialogTrigger>
                </Informative>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How to Write?</DialogTitle>
                    <DialogDescription>
                      Placeholder for a tutorial on how to write.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-2">
              <TextEditorMenuItem variant="set-link" />
              <TextEditorMenuItem variant="unset-link" />
              <ImageUploader />
              <YoutubeMenuItem />
            </div>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
};

export default TextEditorMenu;
