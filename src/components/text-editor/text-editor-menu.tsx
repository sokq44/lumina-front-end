import { FC, useEffect } from "react";
import { Article } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/use-text-editor";
import { useDialogue } from "@/hooks/use-dialogue";
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
  const {
    eventTarget,
    addLinkDialogue,
    uploadImageDialogue,
    youtubeVideoDialogue,
    deleteArticleDialogue,
    articleVisibilityDialogue,
  } = useDialogue();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { editor, article, setArticle, onSave, finishArticle } =
    useTextEditor();

  useEffect(() => {
    if (eventTarget) {
      const handleVisibilityChanged = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (article) {
          const newArticle = {
            ...article,
            public: customEvent.detail.public,
          };
          setArticle(newArticle);
          onSave(newArticle);
        }
      };
      eventTarget.addEventListener(
        "visibility-changed",
        handleVisibilityChanged
      );
      return () => {
        eventTarget.removeEventListener(
          "visibility-changed",
          handleVisibilityChanged
        );
      };
    }
  }, [eventTarget]);

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
        onSave(updated);
      } else {
        toast({
          variant: "destructive",
          title: "Problem With Saving",
          description:
            "An unexpected error has occurred while trying to save the article. Please, try again later.",
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
            className="cursor-pointer transition-all duration-300"
          >
            Save Article
            <MenubarShortcut>
              <Save size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={!article?.id}
            onClick={articleVisibilityDialogue}
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
            disabled={!article?.id}
            onClick={deleteArticleDialogue}
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
            disabled={
              !editor?.can().setLink({ href: "https://www.example.com" })
            }
            onSelect={addLinkDialogue}
            className="cursor-pointer transition-all duration-300"
          >
            Link
            <MenubarShortcut>
              <Link size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={!editor?.can().insertContent({ type: "image-extension" })}
            onSelect={uploadImageDialogue}
            className="cursor-pointer transition-all duration-300"
          >
            Image
            <MenubarShortcut>
              <ImagePlus size={14} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={
              !editor?.can().insertContent({ type: "youtube-extension" })
            }
            onSelect={youtubeVideoDialogue}
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
