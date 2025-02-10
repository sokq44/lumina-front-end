import { useEffect } from "react";
import { Article } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTextEditor } from "@/hooks/text-editor";
import { useRemoveArticle, useSaveArticle } from "@/hooks/articles";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HelpButton from "@/components/text-editor/help-button";
import ImageUploader from "@/components/text-editor/image-uploader";
import HeadingMenuItem from "@/components/text-editor/heading-menu-item";
import YoutubeMenuItem from "@/components/text-editor/youtube-menu-item";
import SaveArticleButton from "@/components/text-editor/save-article-button";
import TextEditorMenuItem from "@/components/text-editor/text-editor-menu-item";
import DeleteArticleButton from "@/components/text-editor/delete-article-button";
import { PrivatePublicSwitch } from "@/components/text-editor/private-public-switch";
import { ChevronsUpDown } from "lucide-react";

const TextEditorMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const textEditor = useTextEditor();
  const articleRemover = useRemoveArticle();
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

  return (
    <Collapsible className="my-4 p-2 border border-gray-200 fixed w-[50rem] z-10 bg-muted rounded-md transform transition-all duration-300">
      <Container className="flex">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-9 h-auto p-2 mr-2">
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        </CollapsibleTrigger>
        <Separator orientation="vertical" className="h-100" />
        <Container className="flex flex-col w-full">
          <Container className="flex items-center gap-2 ml-1 pr-2">
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
            <SaveArticleButton />
            <DeleteArticleButton />
          </Container>
          <CollapsibleContent className="flex flex-col pl-1 pt-1 pr-2">
            <Container className="flex gap-2">
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
              <Container className="w-full" />
              <PrivatePublicSwitch />
              <HelpButton />
            </Container>
            <Container className="flex gap-2">
              <TextEditorMenuItem variant="set-link" />
              <TextEditorMenuItem variant="unset-link" />
              <ImageUploader />
              <YoutubeMenuItem />
            </Container>
          </CollapsibleContent>
        </Container>
      </Container>
    </Collapsible>
  );
};

export default TextEditorMenu;
