import { FC, useEffect, useRef } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/lib/api";
import { EditorContent } from "@tiptap/react";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/assets";
import { useGetArticle } from "@/hooks/articles";
import { useTextEditor } from "@/hooks/text-editor";
import { Link } from "react-router-dom";
import Img from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import EditorToolbar from "@/components/text-editor/editor-toolbar";
import LoadingScreen from "../wraps/loading-screen";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const { toast } = useToast();
  const assetUploader = useUploadAsset();
  const { editor, article, setArticle, finishArticle } = useTextEditor();
  const articleGetter = useGetArticle(article?.id);

  const titleRef = useRef<HTMLInputElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("beforeunload", finishArticle);
    return () => window.removeEventListener("beforeunload", finishArticle);
  }, []);

  useEffect(() => {
    if (articleGetter.error) {
      toast({
        variant: "destructive",
        title: "Problem With Rertieving",
        description: articleGetter.error,
      });
    }
  }, [articleGetter.error, toast]);

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
    setTimeout(() => {
      if (articleGetter.article && titleRef.current && editor) {
        titleRef.current.value = articleGetter.article.title;
        editor.commands.setContent(JSON.parse(articleGetter.article.content));
        setArticle(articleGetter.article);
      }
    });
  }, [articleGetter.article]);

  useEffect(() => {
    const url = assetUploader.url;
    const error = assetUploader.error;

    if (url && error === null) {
      const newArticle = {
        ...article,
        banner: assetUploader.url,
      } as Article;
      setArticle(newArticle);
    }
  }, [assetUploader.error]);

  const changeTitle = () => {
    if (titleRef.current) {
      const title = titleRef.current.value;
      const updated = { ...article, title } as Article;
      if (updated) setArticle(updated);
    }
  };

  const focusEditor = () => {
    if (editor) editor.commands.focus();
  };

  const onBannerChange = async () => {
    const file = bannerInputRef.current?.files?.[0];
    if (file) await assetUploader.upload(file);
  };

  const clickBanner = () => {
    if (bannerInputRef.current) bannerInputRef.current.click();
  };

  if (!articleGetter.isLoading) {
    return (
      <Container className={cn("flex flex-col mt-4", className)}>
        <Container className="flex flex-col mb-10">
          <Container className="w-full h-[28rem] relative mb-8 group">
            {assetUploader.isLoading === true ? (
              <Container className="w-full h-full flex items-center justify-center border border-dashed border-muted-foreground rounded-md">
                <LoadingScreen>Uploading banner...</LoadingScreen>
              </Container>
            ) : (
              <Img
                ref={bannerImgRef}
                src={article ? article.banner : "/default-banner.png"}
                onClick={clickBanner}
                className="w-full h-full aspect-7/4 rounded-lg brightness-90 shadow-md transition-all duration-300 cursor-pointer group-hover:brightness-[0.7] group-hover:blur-[1px]"
              />
            )}
            <Input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onBannerChange}
            />
            <span
              onClick={clickBanner}
              className={cn(
                assetUploader.isLoading ? "hidden" : "visible",
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-0 text-3xl font-bold text-white cursor-pointer group-hover:opacity-100"
              )}
            >
              Click To Change
            </span>
          </Container>
          <input
            ref={titleRef}
            type="text"
            maxLength={25}
            placeholder="Title"
            className="text-5xl font-bold bg-transparent w-full ProseMirror"
            onInput={changeTitle}
          />
          {article && (
            <span className="text-sm text-muted-foreground ">
              Written by&nbsp;
              <Link
                to={`/user/${article.user}`}
                className="sliding-link font-semibold"
              >
                @{article.user}
              </Link>
              &nbsp;on the {formatDate(article.created_at)}
            </span>
          )}
        </Container>
        <EditorToolbar>
          <EditorContent
            onClick={focusEditor}
            editor={editor || null}
            className="min-h-svh w-full mx-auto hover:cursor-text"
          />
        </EditorToolbar>
      </Container>
    );
  }
};

export default TextEditorContent;
