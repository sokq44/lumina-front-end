import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

const client = axios.create({
  baseURL: "http://localhost:3000",
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

export function useRegister(): {
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

export function useLogin(): {
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
      await client.post("/user/login", {
        email: email,
        password: password,
      });
      setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export function useLoggedIn(): {
  isLoggedIn: boolean | undefined;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const canFetch = useRef<boolean>(true);
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

    if (canFetch.current) {
      checkLoggedIn();
      canFetch.current = false;
    }
  }, []);

  return { isLoggedIn, isLoading, error };
}

export function useLogout(): {
  logout: () => void;
  isLoading: boolean;
  error: string | undefined;
} {
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

export function useVerifyUser(token: string | undefined): {
  isLoading: boolean;
  error: string | undefined | null;
} {
  const canFetch = useRef<boolean>(true);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verify = async (token: string | undefined) => {
    if (token) {
      setIsLoading(true);

      try {
        const response = await client.patch("/user/verify-email", { token });
        if (response.status === 204) setError(null);
      } catch (err) {
        const message = (err as AxiosError).response?.data as string;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (canFetch.current) {
      canFetch.current = false;
      verify(token);
    }
  }, [token]);

  return { isLoading, error };
}

export function usePasswordChangeInit(): {
  init: (token: string) => void;
  attempts: number;
  isLoading: boolean;
  error: string | undefined | null;
} {
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

export function useChangePassword(): {
  change: (token: string, password: string) => void;
  attempts: number;
  isLoading: boolean;
  error: string | undefined | null;
} {
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

export function useGetUser(): {
  user: User | null;
  getUser: () => void;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    try {
      const response = await client.get("/user/get-user");
      setUser(response.data as User);
      setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, getUser, isLoading, error };
}

export function useModifyUser(): {
  modify: (user: User) => void;
  attempts: number;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const modify = async (user: User) => {
    setIsLoading(true);

    try {
      const response = await client.patch("/user/modify-user", user);
      if (response.status === 200) setError(null);
    } catch (err) {
      const message = (err as AxiosError).response?.data as string;
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { modify, attempts, isLoading, error };
}

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
      const response = await client.post("/assets/add-image", formData, {
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

export function dummyTimeout(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
