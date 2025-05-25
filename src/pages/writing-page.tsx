import { useEffect, useRef, useState } from "react";
import { Article } from "@/lib/api";
import { getArticleContent, getArticleWidthId } from "@/lib/utils";
import {
  useArticleSaver,
  useArticleGetter,
  useArticleRemover,
} from "@/hooks/api/articles";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { CornerUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Authorized from "@/components/wraps/authorized";
import ThemeSwitch from "@/components/ui/theme-switch";
import TextEditor from "@/components/text-editor/text-editor";
import LoadingScreen from "@/components/wraps/loading-screen";

export default function WritingPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();

  const quitDialogRef = useRef<HTMLButtonElement>(null);
  const newArticleRef = useRef<Article | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  const articleRemover = useArticleRemover();
  const articleSaver = useArticleSaver(state.article?.id);
  const articleGetter = useArticleGetter(state.article?.id);

  useEffect(() => {
    if (state == null) navigate(-1);
  }, [state]);

  useEffect(() => {
    if (articleSaver.error) {
      toast({
        variant: "destructive",
        title: "Problem With Saving",
        description:
          articleSaver.error ||
          "There was an unexpected error while saving your article.",
      });
    } else if (articleSaver.error === null && newArticleRef.current) {
      setArticle(newArticleRef.current);
      toast({
        variant: "success",
        title: "Changes Applied",
        description:
          "All the changes You've made have been applied to the article.",
      });
    }
  }, [articleSaver.error]);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Rertieving",
        description: articleGetter.error,
      });
    } else if (articleGetter.error === null && articleGetter.article) {
      setArticle(articleGetter.article);
    }
  }, [articleGetter.error, articleGetter.article]);

  useEffect(() => {
    if (articleRemover.error) {
      toast({
        variant: "destructive",
        title: "Problem With Removing",
        description:
          articleRemover.error ||
          "There was an unexpected error while trying to remove this article.",
      });
    } else if (articleRemover.error === null) {
      navigate("/user/my-articles");
    }
  }, [articleRemover.error]);

  useEffect(() => {
    if (articleSaver.id && !article) {
      const updated = getArticleWidthId(articleSaver.id);
      navigate(".", { state: { article: updated } });
    }
  }, [articleSaver.id]);

  const onSave = (newArticle: Article | undefined) => {
    if (newArticle) articleSaver.save(newArticle);
  };

  const onModify = (newArticle: Article | undefined) => {
    if (newArticle) newArticleRef.current = newArticle;
  };

  const onRemove = (article: Article | undefined) => {
    if (article) articleRemover.remove(article.id);
  };

  const quit = () => {
    const updated = newArticleRef.current;

    if (!updated || !article) {
      finishWriting();
      return;
    }

    const newContent = JSON.stringify(getArticleContent(updated));
    const oldContent = JSON.stringify(getArticleContent(article));
    const changesMade =
      newContent !== oldContent ||
      updated?.title !== article.title ||
      updated?.public !== article.public ||
      updated?.banner !== article.banner;

    if (changesMade) quitDialogRef.current?.click();
    else finishWriting();
  };

  const finishWriting = () => {
    localStorage.removeItem("curr_article");
    navigate("/user/my-articles");
  };

  if (articleGetter.isLoading) {
    return (
      <Container className="w-screen h-screen">
        <LoadingScreen>Retrieving Article...</LoadingScreen>
      </Container>
    );
  }

  return (
    <Authorized onFail={() => navigate("/login")}>
      <Dialog>
        <DialogTrigger ref={quitDialogRef}></DialogTrigger>
        <DialogContent className="font-funnel">
          <DialogHeader>
            <DialogTitle>Are you sure you want to quit?</DialogTitle>
            <DialogDescription>
              All the unsaved changes won't be applied.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={finishWriting}>Quit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Container className="flex items-center justify-center h-screen w-screen">
        <Button
          onClick={quit}
          variant="ghost"
          className="fixed top-0 left-0 z-[100] m-2 p-2 rounded-md text-primary bg-gray-200 transition-all duration-300 cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15"
        >
          <CornerUpLeft size={24} />
        </Button>
        <ThemeSwitch position="top-right" />
        <TextEditor
          article={article}
          onSave={onSave}
          onRemove={onRemove}
          onModify={onModify}
        />
      </Container>
    </Authorized>
  );
}
