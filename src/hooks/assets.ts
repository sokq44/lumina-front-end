import { useState } from "react";
import { AxiosError } from "axios";
import { client } from "@/lib/api";

export function useUploadImage(): {
  url: string | null;
  upload: (file: File) => void;
  attempts: number;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const upload = async (file: File) => {
    if (!file) {
      setAttempts((prev) => prev + 1);
      setError("There seems to be a problem with this image.");
      return;
    }

    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("image", file);

    try {
      const response = await client.post("/assets/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUrl(response.data as string);
      setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { url, upload, attempts, isLoading, error };
}
