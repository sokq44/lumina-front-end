import { useEffect, useRef, useState } from "react";
import { client, User } from "@/lib/api";
import { grabErrorMessage } from "@/lib/utils";

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
      await client.post("/user/register", {
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
      await client.post("/user/login", {
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
        const response = await client.get("/user/session/check");
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
      const response = await client.delete("user/logout");
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

export function useUserVerifier(token: string | undefined): {
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
        const response = await client.patch("/user/email/verify", { token });
        if (response.status === 204) setError(null);
      } catch (e) {
        const message = grabErrorMessage(e);
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

export function usePasswordChangeInitializer(): {
  init: (email: string) => Promise<void>;
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
      const response = await client.post("/user/password/init", {
        email: email,
      });
      if (response.status === 201) setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setAttempts((last) => last + 1);
      setIsLoading(false);
    }
  };

  return { init, attempts, isLoading, error };
}

export function usePasswordChanger(token: string | undefined): {
  change: (password: string) => void;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const change = async (password: string) => {
    if (token) {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await client.patch("/user/password/change", {
          token: token,
          password: password,
        });
        if (response.status === 200) setError(null);
      } catch (e) {
        const message = grabErrorMessage(e);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { change, isLoading, error };
}

export function usePasswordChangeValidator(token: string | undefined): {
  valid: boolean | undefined;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [valid, setValid] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const check = async () => {
      if (token) {
        setIsLoading(true);
        setError(undefined);

        try {
          const response = await client.get(
            `/user/password/valid?token=${token}`
          );
          if (response.status === 200) {
            setValid(true);
            setError(null);
          }
        } catch (e) {
          const message = grabErrorMessage(e);
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    check();
  }, []);

  return { valid, isLoading, error };
}

export function useUserGetter(): {
  user: User | null;
  getUser: () => void;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await client.get("/user/get");
      setUser(response.data as User);
      setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
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

export function useUserModifier(): {
  modify: (user: User) => void;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modify = async (user: User) => {
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await client.patch("/user/update", user);
      if (response.status === 200) setError(null);
    } catch (e) {
      const message = grabErrorMessage(e);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { modify, isLoading, error };
}

export function useEmailChangeInitializer(): {
  init: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const init = async (email: string) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const response = await client.post("/user/email/init", {
        new_email: email,
      });
      if (response.status === 201) setError(null);
    } catch (e) {
      setError(grabErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return { init, isLoading, error };
}

export function useEmailChanger(): {
  change: (token: string) => Promise<void>;
  isLoading: boolean;
  error: string | undefined | null;
} {
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const change = async (token: string) => {
    try {
      setIsLoading(true);
      setError(undefined);

      await client.patch("/user/email/change", {
        token,
      });
      setError(null);
    } catch (e) {
      setError(grabErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return { change, isLoading, error };
}
