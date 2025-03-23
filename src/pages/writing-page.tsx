import { useEffect, useState } from "react";
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
import ThemeSwitch from "@/components/theme/theme-switch";
import TextEditor from "@/components/text-editor/text-editor";
import {
  useGetArticle,
  useRemoveArticle,
  useSaveArticle,
} from "@/hooks/articles";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/lib/api";
import { getArticleWidthId } from "@/lib/utils";
import LoadingScreen from "@/components/wraps/loading-screen";
import { useUploadAsset } from "@/hooks/assets";

export default function WritingPage() {
  const { state } = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | undefined>(undefined);

  const assetUploader = useUploadAsset();
  const articleRemover = useRemoveArticle();
  const articleSaver = useSaveArticle(state.article?.id);
  const articleGetter = useGetArticle(state.article?.id);

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
    } else if (articleSaver.error === null) {
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
    } else if (articleGetter.error === null) {
      if (articleGetter.article) setArticle(articleGetter.article);
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
    if (assetUploader.error) {
      toast({
        variant: "destructive",
        title: "Problem With Uploading An Asset",
        description: assetUploader.error,
      });
    } else if (assetUploader.error === null) {
      const url = assetUploader.url;
      if (url) {
        const newArticle = {
          ...article,
          banner: url,
        } as Article;
        setArticle(newArticle);
      }
    }
  }, [assetUploader.error]);

  useEffect(() => {
    if (articleSaver.id && !article) {
      const updated = getArticleWidthId(articleSaver.id);
      navigate(".", { state: { article: updated } });
    }
  }, [articleSaver.id]);

  const onSave = (article: Article | undefined) => {
    if (article) articleSaver.save(article);
  };

  const onRemove = (article: Article | undefined) => {
    if (article) articleRemover.remove(article.id);
  };

  const onBannerChange = (file: File | undefined) => {
    if (file) assetUploader.upload(file);
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
      <Container className="flex items-center justify-center h-screen w-screen">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="fixed top-0 left-0 z-[100] m-2 p-2 rounded-md cursor-pointer transition-all duration-300"
            >
              <CornerUpLeft />
            </Button>
          </DialogTrigger>
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
        <ThemeSwitch position="top-right" />
        <TextEditor
          article={article}
          onSave={onSave}
          onRemove={onRemove}
          onBannerChange={onBannerChange}
        />
      </Container>
    </Authorized>
  );
}
