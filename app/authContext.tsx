"use client";
import { createContext, ReactNode, useContext } from "react";

interface authProviderProps {
  children: ReactNode;
}

interface LoginForm {
  email: string;
  password: string;
}

interface UserLoginResponse {
  token: string;
  user: any;
}

interface AuthContextType {
  userLogin: (loginForm: LoginForm) => Promise<UserLoginResponse>;
  userLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: authProviderProps) => {
  async function userLogin(loginForm: LoginForm) {
    return {
      token: "token",
      user: "user",
    };
  }

  async function userLogout() {
    return;
  }

  return (
    <AuthContext.Provider value={{ userLogin, userLogout }}>
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
