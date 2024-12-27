import { client } from "@/lib/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type Article = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
};

export function useAddArticle() {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const add = async (title: string, content: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.post("/articles/add", { title, content });
      if (response.status === 200) setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { add, isLoading, error };
}

export function useGetArticles() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.get("/articles");
      if (response.status === 200) {
        setArticles(response.data as Article[]);
        setError(null);
      }
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return { articles, isLoading, error };
}
