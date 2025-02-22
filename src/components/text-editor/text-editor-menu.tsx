import { useEffect } from "react";
import { Article } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/text-editor";
import { useEditorDialogue } from "@/hooks/editor-dialogue";
import { useRemoveArticle, useSaveArticle } from "@/hooks/articles";
import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
  MenubarTrigger,
  MenubarShortcut,
  MenubarSeparator,
} from "@/components/ui/menubar";
import {
  Link,
  Plus,
  Save,
  Trash2,
  BookLock,
  ImagePlus,
  BookCheck,
  TvMinimalPlay,
} from "lucide-react";

const TextEditorMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const textEditor = useTextEditor();
  const articleRemover = useRemoveArticle();
  const editorDialogue = useEditorDialogue();
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

  useEffect(() => {
    if (articleSaver.id) {
      const newArticle = {
        ...textEditor.article,
        id: articleSaver.id,
      } as Article;
      textEditor.setArticle(newArticle);
      navigate(".", {
        replace: true,
        state: { article: newArticle },
      });
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

  const newWindow = () => {
    textEditor.finishArticle();
    navigate(".", { replace: true, state: { article: undefined } });
    window.location.reload();
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Article</MenubarTrigger>
        <MenubarContent className="font-funnel">
          <MenubarItem
            onClick={newWindow}
            className="cursor-pointer transition-all duration-300"
          >
            New Article{" "}
            <MenubarShortcut>
              <Plus size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={saveChanges}
            disabled={articleSaver.isLoading || articleRemover.isLoading}
            className="cursor-pointer transition-all duration-300"
          >
            Save Article{" "}
            <MenubarShortcut>
              <Save size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onClick={editorDialogue.articleVisibilityDialogue}
            disabled={
              articleSaver.isLoading ||
              articleRemover.isLoading ||
              !textEditor.article?.id
            }
            className="cursor-pointer transition-all duration-300"
          >
            {textEditor.article?.public ? "Public" : "Private"}{" "}
            <MenubarShortcut>
              {textEditor.article?.public ? (
                <BookCheck size={14} />
              ) : (
                <BookLock size={14} />
              )}
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onClick={editorDialogue.deleteArticleDialogue}
            disabled={
              articleSaver.isLoading ||
              articleRemover.isLoading ||
              !textEditor.article?.id
            }
            className="text-destructive cursor-pointer transition-all duration-300 hover:text-destructive"
          >
            Delete Article{" "}
            <MenubarShortcut className="text-destructive">
              <Trash2 size={14} />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Add</MenubarTrigger>
        <MenubarContent className="font-funnel">
          <MenubarItem
            onSelect={editorDialogue.addLinkDialogue}
            className="cursor-pointer"
          >
            Link
            <MenubarShortcut>
              <Link size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={editorDialogue.uploadImageDialogue}
            className="cursor-pointer"
          >
            Image
            <MenubarShortcut>
              <ImagePlus size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={editorDialogue.youtubeVideoDialogue}
            className="cursor-pointer"
          >
            Youtbe
            <MenubarShortcut>
              <TvMinimalPlay size={14} />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default TextEditorMenu;
