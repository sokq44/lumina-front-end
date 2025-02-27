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
import Container from "@/components/container";
import EditorToolbar from "@/components/text-editor/editor-toolbar";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const { toast } = useToast();
  const textEditor = useTextEditor();
  const assetUploader = useUploadAsset();
  const articleGetter = useGetArticle(textEditor.article?.id);

  const titleRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(textEditor.article);
    window.addEventListener("beforeunload", textEditor.finishArticle);
    return () =>
      window.removeEventListener("beforeunload", textEditor.finishArticle);
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
          ...textEditor.article,
          banner: url,
        } as Article;
        textEditor.setArticle(newArticle);
      }
    }
  }, [assetUploader.error, assetUploader.url, toast]);

  useEffect(() => {
    if (articleGetter.article && titleRef.current) {
      titleRef.current.value = articleGetter.article.title;
      textEditor.editor?.commands.setContent(articleGetter.article.content);
      textEditor.setArticle(articleGetter.article);
    }
  }, [articleGetter.article]);

  useEffect(() => {
    const url = assetUploader.url;
    const error = assetUploader.error;

    if (url && error === null) {
      const newArticle = {
        ...textEditor.article,
        banner: assetUploader.url,
      } as Article;
      textEditor.setArticle(newArticle);
    }
  }, [assetUploader.url, assetUploader.error]);

  const changeTitle = () => {
    if (titleRef.current) {
      const newArticle = {
        ...textEditor.article,
        title: titleRef.current.value,
      } as Article;
      if (newArticle) textEditor.setArticle(newArticle);
    }
  };

  const focusEditor = () => {
    textEditor.editor?.commands.focus();
  };

  const onBannerChange = async () => {
    const banner = bannerRef.current?.files?.[0];
    if (banner) {
      await assetUploader.upload(banner);
    }
  };

  const formattedDate = textEditor.article?.created_at
    ? new Date(textEditor.article.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  if (!articleGetter.isLoading) {
    return (
      <Container className={cn("flex flex-col mt-4", className)}>
        <Container className="flex flex-col mb-10">
          <Container className="relative mb-8 group">
            <img
              onClick={() => bannerRef.current?.click()}
              src={
                textEditor.article?.banner
                  ? textEditor.article?.banner
                  : "/default-banner.png"
              }
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
          {textEditor.article?.user && (
            <span className="text-sm text-muted-foreground ">
              Written by&nbsp;
              <Link
                to={`/user/${textEditor.article?.user}`}
                className="sliding-link font-semibold"
              >
                @{textEditor.article?.user}
              </Link>{" "}
              on the {formattedDate}
            </span>
          )}
        </Container>
        <EditorToolbar>
          <EditorContent
            onClick={focusEditor}
            editor={textEditor.editor ?? null}
            className="min-h-svh w-full mx-auto hover:cursor-text"
          />
        </EditorToolbar>
      </Container>
    );
  }
};

export default TextEditorContent;
