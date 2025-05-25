import { FC, useEffect, useRef } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/lib/api";
import { EditorContent } from "@tiptap/react";
import { useTextEditor } from "@/hooks/use-text-editor";
import { Link } from "react-router-dom";
import Img from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import EditorToolbar from "@/components/text-editor/editor-toolbar";
import { useDialogue } from "@/hooks/use-dialogue";

interface TextEditorContentProps {
  className?: string;
}

const TextEditorContent: FC<TextEditorContentProps> = ({ className }) => {
  const { editor, article, onSave, setArticle, getArticle } = useTextEditor();
  const { eventTarget, changeBannerDialogue } = useDialogue();

  const titleRef = useRef<HTMLInputElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (eventTarget) {
      const handleBannerChanged = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (article && customEvent.detail.banner) {
          const updated = {
            ...getArticle(),
            banner: customEvent.detail.banner,
          };
          setArticle(updated);
          onSave(updated);
        }
      };
      eventTarget.addEventListener("banner-changed", handleBannerChanged);
      return () => {
        eventTarget.removeEventListener("banner-changed", handleBannerChanged);
      };
    }
  }, [eventTarget]);

  const changeTitle = () => {
    if (titleRef.current) {
      const updated = {
        ...getArticle(),
        title: titleRef.current.value,
      } as Article;
      if (updated) setArticle(updated);
    }
  };

  const clickBanner = () => {
    if (changeBannerDialogue) changeBannerDialogue();
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
          <span
            onClick={clickBanner}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 text-3xl font-bold text-white cursor-pointer group-hover:opacity-100"
          >
            Click To Change
          </span>
        </Container>
        <Input
          ref={titleRef}
          type="text"
          maxLength={25}
          placeholder="Title"
          value={article?.title}
          onChange={changeTitle}
          className="text-5xl font-bold bg-transparent w-full border-none px-0 py-1 h-auto rounded-none"
        />
        {article?.user && article?.created_at && (
          <span className="text-sm text-muted-foreground">
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
          editor={editor || null}
          style={{ outline: "none" }}
          className="min-h-svh w-full mx-auto hover:cursor-text focus:outline-none focus-visible:outline-none focus:border-none focus-visible:border-none"
        />
      </EditorToolbar>
    </Container>
  );
};

export default TextEditorContent;
