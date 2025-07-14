import { client } from "@/lib/api";
import { grabErrorMessage } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function useUserRegistrar(): {
  register: (username: string, email: string, password: string) => void;
  attempts: number;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);

    try {
      await client.post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { register, attempts, isLoading, error };
}

export function useUserAuthenticator(): {
  login: (email: string, password: string) => void;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      await client.post("/auth/login", {
        email: email,
        password: password,
      });
      setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export function useSessionTerminator(): {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.delete("/auth/logout");
      if (response.status === 200) setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
}

export function useUserValidator(): {
  isLoggedIn: boolean | undefined;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const canFetch = useRef<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await client.get("/auth/check");
        if (response.status === 200) setIsLoggedIn(true);
      } catch (e) {
        const message = grabErrorMessage(e);
        setError(message);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (canFetch.current) {
      checkLoggedIn();
      canFetch.current = false;
    }
  }, []);

  return { isLoggedIn, isLoading, error };
}
