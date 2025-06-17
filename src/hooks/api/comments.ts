import { client } from "@/lib/api";
import { grabErrorMessage } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function useCommentsGetter(id: string) {
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
      setComments(response.data);
    } catch (err) {
      const message = grabErrorMessage(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { get, isLoading, error, comments };
}

export function useCommentCreator(id: string) {
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = async (comment: {
    article_id: string;
    comment: { content: string };
  }) => {
    if (!id) return;

    setIsLoading(true);

    try {
      await client.post("/comments/article/create", comment);
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
