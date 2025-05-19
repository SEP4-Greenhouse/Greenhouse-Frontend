import { createContext, useContext, useState, useEffect } from "react";
import * as auth from "../services/fakeAuthService";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(auth.getToken());
  const [user, setUser] = useState<any>(null);

  const handleLogin = async (username: string, password: string) => {
    const response = await auth.login(username, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const handleRegister = async (data: auth.User) => {
    const response = await auth.register(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const handleLogout = () => {
    auth.logout();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser, // ✅ now exposed to components like <Account />
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
