export interface User {
  username: string;
  password: string;
  email?: string;
}

export const register = async (data: User) => {
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", "fake-jwt-token");
  return {
    user: data,
    token: "fake-jwt-token",
  };
};

export const login = async (username: string, password: string) => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) throw new Error("No user found. Please register first.");

  const user = JSON.parse(storedUser);
  if (user.username === username && user.password === password) {
    return {
      user,
      token: "fake-jwt-token",
    };
  }

  throw new Error("Invalid credentials");
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const updateAccount = async (updated: Partial<User>) => {
  const stored = localStorage.getItem("user");
  if (!stored) throw new Error("No user session found.");

  const current = JSON.parse(stored) as User;

  // ✅ Update fields
  const updatedUser: User = {
    ...current,
    ...updated,
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));
  return updatedUser;
};
