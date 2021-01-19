import { createContext } from "react";

interface AuthContext {
  token: string;
  userId: string;
  login: (token: string, id: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userName: string;
}

export const AuthContext = createContext<AuthContext>({
  token: "",
  userId: "",
  userName: "",
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});
