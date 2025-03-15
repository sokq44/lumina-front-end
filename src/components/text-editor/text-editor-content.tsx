import { FC, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Article } from "@/lib/api";
import { EditorContent } from "@tiptap/react";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/assets";
import { useGetArticle } from "@/hooks/articles";
import { useTextEditor } from "@/hooks/text-editor";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import EditorToolbar from "@/components/text-editor/editor-toolbar";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const { toast } = useToast();
  const assetUploader = useUploadAsset();
  const { editor, article, setArticle, finishArticle } = useTextEditor();
  const articleGetter = useGetArticle(article?.id);

  const titleRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

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
    if (articleGetter.article && titleRef.current && editor) {
      titleRef.current.value = articleGetter.article.title;
      editor.commands.setContent(JSON.parse(articleGetter.article.content));
      setArticle(articleGetter.article);
    }
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
    const banner = bannerRef.current?.files?.[0];
    if (banner) await assetUploader.upload(banner);
  };

  const getFormattedDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!articleGetter.isLoading) {
    return (
      <Container className={cn("flex flex-col mt-4", className)}>
        <Container className="flex flex-col mb-10">
          <Container className="relative mb-8 group">
            <img
              onClick={() => bannerRef.current?.click()}
              src={article?.banner || "/default-banner.png"}
              className="w-full h-auto aspect-7/4 rounded-lg brightness-90 shadow-md transition-all duration-300 cursor-pointer group-hover:brightness-[0.7] group-hover:blur-[1px]"
            />
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onBannerChange}
              ref={bannerRef}
            />
            <span
              onClick={() => bannerRef.current?.click()}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-0 text-3xl font-bold text-white cursor-pointer group-hover:opacity-100"
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
          {article?.user && (
            <span className="text-sm text-muted-foreground ">
              Written by&nbsp;
              <Link
                to={`/user/${article?.user}`}
                className="sliding-link font-semibold"
              >
                @{article?.user}
              </Link>{" "}
              on the {getFormattedDate(article.created_at)}
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
