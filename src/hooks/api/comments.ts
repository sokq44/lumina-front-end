import { Comment, client } from "@/lib/api";
import { grabErrorMessage } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function useCommentsGetter(id?: string): {
  get: () => Promise<void>;
  isLoading: boolean;
  error: string | null | undefined;
  comments: Comment[] | undefined;
} {
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const idRef = useRef<string>(id);

  useEffect(() => {
    get();
  }, [idRef]);

  const get = async () => {
    if (!idRef.current) return;

    setIsLoading(true);

    try {
      const response = await client.get<Comment[]>(
        `/comments/article/all?articleId=${idRef.current}`
      );
      setError(null);
      setComments(response.data as Comment[]);
    } catch (err) {
      const message = grabErrorMessage(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { get, isLoading, error, comments };
}

export function useCommentCreator(id?: string): {
  create: (articleId: string, content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null | undefined;
} {
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = async (articleId: string, content: string) => {
    if (!id) return;

    setIsLoading(true);

    try {
      await client.post("/comments/article/create", {
        article_id: articleId,
        comment: { content },
      });
      setError(null);
    } catch (err) {
      const message = grabErrorMessage(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function useCommentModifier(): {
  modify: (commentId: string, newContent: string) => Promise<void>;
  error: string | null | undefined;
  isLoading: boolean;
} {
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modify = async (commentId: string, newContent: string) => {
    setIsLoading(true);

    try {
      await client.patch("/comments/article/update", {
        comment_id: commentId,
        content: newContent,
      });
      setError(null);
    } catch (err) {
      const message = grabErrorMessage(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { modify, error, isLoading };
}

export function useCommentRemover(): {
  remove: (commentId: string) => Promise<void>;
  error: string | null | undefined;
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(undefined);

  const remove = async (commentId: string) => {
    setIsLoading(true);

    try {
      await client.delete(`/comments/article/delete?id=${commentId}`);
      setError(null);
    } catch (err) {
      const message = grabErrorMessage(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, error, isLoading };
}
