import { FC, useEffect, useRef } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/lib/api";
import { EditorContent } from "@tiptap/react";
import { useTextEditor } from "@/hooks/text-editor";
import { Link } from "react-router-dom";
import Img from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import EditorToolbar from "@/components/text-editor/editor-toolbar";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const { editor, article, onBannerChange, setArticle } = useTextEditor();

  const titleRef = useRef<HTMLInputElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (article && editor) {
      editor.commands.setContent(JSON.parse(article.content));
      if (titleRef.current instanceof HTMLInputElement) {
        titleRef.current.value = article.title;
      }
    }
  }, [article]);

  const changeTitle = () => {
    if (titleRef.current) {
      const updated = { ...article, title: titleRef.current.value } as Article;
      if (updated) setArticle(updated);
    }
  };

  const changeBanner = async () => {
    const file = bannerInputRef.current?.files?.[0];
    onBannerChange(file);
  };

  const clickBanner = () => {
    if (bannerInputRef.current) bannerInputRef.current?.click();
  };

  return (
    <Container className={cn("flex flex-col mt-4", className)}>
      <Container className="flex flex-col mb-10">
        <Container className="w-full h-[28rem] relative mb-8 group">
          <Img
            ref={bannerImgRef}
            src={article?.banner ? article.banner : "/default-banner.png"}
            onClick={clickBanner}
            className="w-full h-full aspect-7/4 rounded-lg brightness-90 shadow-md transition-all duration-300 cursor-pointer group-hover:brightness-[0.7] group-hover:blur-[1px]"
          />
          <Input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={changeBanner}
          />
          <span
            onClick={clickBanner}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-0 text-3xl font-bold text-white cursor-pointer group-hover:opacity-100"
          >
            Click To Change
          </span>
        </Container>
        <Input
          ref={titleRef}
          type="text"
          maxLength={25}
          placeholder="Title"
          className="text-5xl font-bold bg-transparent w-full border-none px-0 py-1 h-auto rounded-none"
          onInput={changeTitle}
        />
        {article?.user && article?.created_at && (
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
          onClick={() => editor?.commands.focus()}
          editor={editor || null}
          className="min-h-svh w-full mx-auto hover:cursor-text"
        />
      </EditorToolbar>
    </Container>
  );
};

export default TextEditorContent;
