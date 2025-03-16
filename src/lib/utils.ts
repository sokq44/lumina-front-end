import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Article } from "./api";
import { JSONContent } from "@tiptap/react";

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
