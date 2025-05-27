import {
  login as loginApi,
  register as registerApi,
  getMe,
} from "../../api/authService";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<any>;
  logout: () => void;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);

  // Auto-login if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const userInfo = await getMe(token);
        setUser(userInfo);
        localStorage.setItem("userId", userInfo.id.toString());
        localStorage.setItem("username", userInfo.name.toLowerCase().trim()); // ✅ Save username for greenhouse key
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

  const userInfo = await getMe(response.token);
  setUser(userInfo);

  localStorage.setItem("userId", userInfo.id.toString());
  localStorage.setItem("username", userInfo.name.toLowerCase()); // normalize here too
  console.log("✅ Stored username:", userInfo.name);

};


  const register = async (data: { name: string; email: string; password: string }) => {
    return await registerApi(data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username"); // ✅ clear it
    localStorage.removeItem("greenhouseId");
    localStorage.removeItem("plantId");
    localStorage.removeItem("greenhouse-" + localStorage.getItem("username")); // ✅ clear greenhouse data
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
