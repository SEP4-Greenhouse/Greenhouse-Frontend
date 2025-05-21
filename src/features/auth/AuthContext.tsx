// src/features/auth/AuthContext.tsx
import {
  login as loginApi,
  register as registerApi,
  getMe,
} from "../../api/authService"; // Adjust the import path as necessary
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const userInfo = await getMe(token);
        setUser(userInfo);
      } catch {
        logout();
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await loginApi({ email, password });
    setToken(response.token);
    localStorage.setItem("token", response.token);
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const newUser = await registerApi(data);
    return newUser;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
