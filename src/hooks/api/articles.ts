import { useEffect, useRef, useState } from "react";
import { Article, client } from "@/lib/api";
import { grabErrorMessage } from "@/lib/utils";

export function useArticleSaver(articleId?: string): {
  save: (article: Article) => Promise<void>;
  id: string;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [id, setId] = useState<string>(articleId ? articleId : "");
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const save = async (article: Article) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.put("/articles/save", {
        id,
        title: article.title,
        content: article.content,
        public: article.public,
        banner: article.banner,
      });
      if (response.status === 200) {
        setError(null);
        setId(response.data);
      }
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { save, id, isLoading, error };
}

export function useArticlesGetter(): {
  articles: Article[] | null;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.get("/articles/get-all");
      if (response.status === 200) {
        setArticles(response.data as Article[]);
        setError(null);
      }
    } catch (e) {
      const message = grabErrorMessage(e);
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

export function useArticleGetter(articleId?: string): {
  article: Article | null;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const canFetch = useRef<boolean>(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await client.get(`/articles/get?article=${articleId}`);
        if (response.status === 200) {
          setArticle(response.data as Article);
          setError(null);
        }
      } catch (e) {
        const message = grabErrorMessage(e);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId && canFetch.current) {
      get();
      canFetch.current = false;
    }
  }, [articleId]);

  return { article, isLoading, error };
}

export function useArticleRemover(): {
  remove: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const remove = async (id: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.delete("/articles/delete", {
        data: { id },
      });

      if (response.status === 200) setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error };
}

export function useSuggestedArticlesGetter(): {
  articles: Article[] | null;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const canFetch = useRef<boolean>(true);
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.get("/articles/get-suggested");

      if (response.status === 200) {
        setArticles(response.data as Article[]);
        setError(null);
      }
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (canFetch) {
      canFetch.current = false;
      get();
    }
  }, []);

  return { articles, isLoading, error };
}
