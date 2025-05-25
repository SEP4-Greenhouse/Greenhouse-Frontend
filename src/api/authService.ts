import axios from "axios";
import { BASE_URL } from "../api/baseUrl"; // ✅ adjust path if needed

const API = `${BASE_URL}/api`;

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

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export const register = async (data: RegisterRequest): Promise<UserDto> => {
  const res = await axios.post<UserDto>(`${API}/Auth/register`, data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API}/Auth/login`, data);
  return res.data;
};

export const getMe = async (token: string): Promise<UserDto> => {
  const res = await axios.get<UserDto>(`${API}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateName = async (name: string, token: string): Promise<void> => {
  await axios.put(`${API}/user/name`, name, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updatePassword = async (newPassword: string, token: string): Promise<void> => {
  await axios.put(`${API}/user/password`, newPassword, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
