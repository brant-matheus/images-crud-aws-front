"use client";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "./toastContext";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
interface authProviderProps {
  children: ReactNode;
}
export type UserType = { email: string; fullName: string; avatar: string };

interface LoginForm {
  email: string;
  password: string;
}

interface AuthContextType {
  userLogin: (loginForm: LoginForm) => Promise<void>;
  userLogout: () => Promise<void>;
  api: AxiosInstance;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: authProviderProps) => {
  const { pushToast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const api = axios.create({
    baseURL: apiKey,
  });

  const setAuthHeader = useCallback(() => {
    const { token } = getLocalStorageData();
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
      pushToast({
        text: "Login efetuado com sucesso",
        type: "success",
      });
      router.push("/images");
    } catch (error) {
      pushToast({
        text: "Falha ao logar",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function userLogout() {
    try {
      await api.post("/logout");
      pushToast({
        text: "Logout efetuado com sucesso",
        type: "success",
      });
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
    <AuthContext.Provider value={{ userLogin, userLogout, api, isLoading }}>
      {children}
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
