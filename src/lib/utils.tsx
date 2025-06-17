import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Article } from "@/lib/api";
import { JSONContent } from "@tiptap/react";
import ImageArticleSection from "@/components/node-views/image/image-article-section";
import { DOMNode, Element } from "html-react-parser";
import YoutubeArticleSection from "@/components/node-views/youtube/youtube-article-section";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dummyTimeout(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function grabErrorMessage(error: unknown): string {
  return (error as AxiosError).response?.data as string;
}

export function formatDate(date: Date | undefined): string {
  return date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
}

export function getArticleContent(article: Article | null): JSONContent {
  const raw = article?.content || "";
  const parsed = raw ? JSON.parse(raw) : { type: "doc", content: [] };
  return parsed as JSONContent;
}

export function extensionToElement(node: DOMNode) {
  const element = node as unknown as Element;

  if (element.name === "image-extension") {
    const { src, label, imagewidth } = element.attribs;
    return (
      <ImageArticleSection
        src={src}
        label={label}
        width={parseInt(imagewidth)}
      />
    );
  } else if (element.name === "youtube-extension") {
    const { src, label, iframewidth } = element.attribs;
    return (
      <YoutubeArticleSection
        src={src}
        label={label}
        width={parseInt(iframewidth)}
      />
    );
  }
}

export function getEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

export function getArticleWidthId(id: string): Article {
  return {
    id: id,
    user: "",
    title: "",
    banner: "",
    content: "",
    public: false,
    user_image: "",
    created_at: new Date(0),
  } as Article;
}

export function getEmptyArticle(): Article {
  return {
    id: "",
    user: "",
    title: "",
    banner: "",
    content: '{"type":"doc","content":[{"type":"paragraph"}]}',
    user_image: "",
    public: false,
    created_at: new Date(),
  };
}
