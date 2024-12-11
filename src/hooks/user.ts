import axios, { AxiosError } from "axios";
import { useEffect, useState, useCallback } from "react";

const client = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export type User = {
  username: string;
  email: string;
  image: string;
};

export function useRegister() {
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
      await client.post("/user/register", {
        username: username,
        email: email,
        password: password,
      });
      setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { register, attempts, isLoading, error };
}

export function useLogin() {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await client.post("/user/login", {
        email: email,
        password: password,
      });
      setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { login, attempts, isLoading, error };
}

export function useLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);

      try {
        const response = await client.get("/user/logged-in");
        if (response.status === 200) setIsLoggedIn(true);
      } catch (err) {
        const message = (err as AxiosError).response?.data as string;
        setError(message);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  return { isLoading, isLoggedIn, error };
}

export function useLogout() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = async () => {
    setIsLoading(true);

    try {
      await client.delete("user/logout");
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
}

export function useVerifyUser() {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verify = useCallback(async (token: string) => {
    setIsLoading(true);

    try {
      const response = await client.patch("/user/verify-email", {
        token: token,
      });
      if (response.status === 204) setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { verify, isLoading, error };
}

export function usePasswordChangeInit() {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const init = async (email: string) => {
    setIsLoading(true);

    try {
      const response = await client.post("/user/password-change-init", {
        email: email,
      });
      if (response.status === 201) setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { init, attempts, isLoading, error };
}

export function useChangePassword() {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const change = async (token: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await client.patch("/user/change-password", {
        token: token,
        password: password,
      });
      if (response.status === 200) setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { change, attempts, isLoading, error };
}

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await client.get("user/get-user");
        setUser(response.data as User);
        setError(null);
      } catch (err) {
        const message = (err as AxiosError).response?.data as string;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, error, isLoading };
}
