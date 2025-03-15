import { FC, useEffect } from "react";
import { Article } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/text-editor";
import { useEditorDialogue } from "@/hooks/editor-dialogue";
import { useRemoveArticle, useSaveArticle } from "@/hooks/articles";
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
import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
  MenubarTrigger,
  MenubarShortcut,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { MenubarProps } from "@radix-ui/react-menubar";

const TextEditorMenu: FC<MenubarProps> = (props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const articleRemover = useRemoveArticle();
  const editorDialogue = useEditorDialogue();
  const { editor, article, setArticle, finishArticle } = useTextEditor();
  const articleSaver = useSaveArticle(article?.id);

  useEffect(() => {
    if (articleSaver.error) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description:
          articleSaver.error ||
          "There was an unexpected error while saving your article.",
      });
    }
  }, [articleSaver.error, toast]);

  useEffect(() => {
    if (articleSaver.id) {
      const updated = {
        ...article,
        id: articleSaver.id,
      } as Article;

      setArticle(updated);

      navigate(".", {
        replace: true,
        state: { article: updated },
      });
    }
  }, [articleSaver.id]);

  const saveChanges = async () => {
    if (!editor || !article) return;

    const title = article.title;
    const content = JSON.stringify(editor.getJSON());

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
      const updated = { ...article, content } as Article;

      if (updated) {
        await articleSaver.save(updated);
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
    finishArticle();
    navigate(".", { replace: true, state: { article: undefined } });
    window.location.reload();
  };

  return (
    <Menubar {...props}>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Article</MenubarTrigger>
        <MenubarContent className="font-funnel">
          <MenubarItem
            onClick={newWindow}
            className="cursor-pointer transition-all duration-300"
          >
            New Article
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
            Save Article
            <MenubarShortcut>
              <Save size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onClick={editorDialogue.articleVisibilityDialogue}
            disabled={
              articleSaver.isLoading || articleRemover.isLoading || !article?.id
            }
            className="cursor-pointer transition-all duration-300"
          >
            {article?.public ? "Public" : "Private"}
            <MenubarShortcut>
              {article?.public ? (
                <BookCheck size={14} />
              ) : (
                <BookLock size={14} />
              )}
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onClick={editorDialogue.deleteArticleDialogue}
            disabled={
              articleSaver.isLoading || articleRemover.isLoading || !article?.id
            }
            className="text-destructive cursor-pointer transition-all duration-300 hover:text-destructive"
          >
            Delete Article
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
            disabled={editor
              ?.can()
              .setLink({ href: "https://www.example.com" })}
            onSelect={editorDialogue.addLinkDialogue}
            className="cursor-pointer transition-all duration-300"
          >
            Link
            <MenubarShortcut>
              <Link size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={editor?.can().setImage({ src: "/iu-placeholder.png" })}
            onSelect={editorDialogue.uploadImageDialogue}
            className="cursor-pointer transition-all duration-300"
          >
            Image
            <MenubarShortcut>
              <ImagePlus size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={editor?.can().setYoutubeVideo({
              src: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            })}
            onSelect={editorDialogue.youtubeVideoDialogue}
            className="cursor-pointer transition-all duration-300"
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
