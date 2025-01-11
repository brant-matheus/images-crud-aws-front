"use client";
import axios, { AxiosInstance } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
interface authProviderProps {
  children: ReactNode;
}

interface LoginForm {
  email: string;
  password: string;
}

interface UserLoginResponse {
  token: any;
  user: any;
}

interface AuthContextType {
  userLogin: (loginForm: LoginForm) => Promise<void>;
  userLogout: () => Promise<void>;
  api: AxiosInstance;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: authProviderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const api = axios.create({
    baseURL: apiKey,
  });

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const setAuthHeader = useCallback(() => {
    const token = getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [api]);

  async function userLogin(loginForm: LoginForm) {
    setIsLoading(true);
    try {
      const response = await api.post("/login", loginForm);
      const { token, user } = response.data;
      localStorage.setItem("token", token.token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthHeader();
      router.push("/images");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function userLogout() {
    try {
      await api.post("/logout");
    } catch (error) {
    } finally {
      localStorage.clear();
      router.push("/");
    }
  }

  useEffect(() => {
    setAuthHeader();
  }, [setAuthHeader]);
  return (
    <AuthContext.Provider value={{ userLogin, userLogout, api }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
