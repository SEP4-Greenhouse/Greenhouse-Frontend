// src/services/authService.ts
import axios from "axios";

// ✅ Base URL to your backend
const API = "http://localhost:5001/api";

// ✅ DTOs from your backend
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiry: string;
}

// ✅ User returned by /user/me
export interface UserDto {
  id: number;
  name: string;
  email: string;
}

// ✅ Register user with backend
export const register = async (data: RegisterRequest): Promise<UserDto> => {
  const res = await axios.post<UserDto>(`${API}/Auth/register`, data);
  return res.data;
};

// ✅ Login and receive JWT token
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API}/Auth/login`, data);
  return res.data;
};

// ✅ Fetch current user using token
export const getMe = async (token: string): Promise<UserDto> => {
  const res = await axios.get<UserDto>(`${API}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Update name of logged-in user
export const updateName = async (name: string, token: string): Promise<void> => {
  await axios.put(`${API}/user/name`, name, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// ✅ Update password of logged-in user
export const updatePassword = async (newPassword: string, token: string): Promise<void> => {
  await axios.put(`${API}/user/password`, newPassword, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
