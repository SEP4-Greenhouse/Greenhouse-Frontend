// __tests__/authService.test.ts
import axios, { AxiosResponse } from "axios";
import * as authService from "../authService";
import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";

vi.mock("axios");
const mockedAxios = axios as unknown as Mocked<typeof axios>;

describe("AuthService", () => {
  const token = "mock-token";

  const user = { id: 1, name: "TestUser", email: "test@example.com" };
  const loginResponse = { token: "mock-token", expiry: "1h" };

  const mockAxiosResponse = <T,>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: "OK",
    headers: new (axios as any).AxiosHeaders(),
    config: {
      headers: new (axios as any).AxiosHeaders(),
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a new user", async () => {
    mockedAxios.post.mockResolvedValueOnce(mockAxiosResponse(user));

    const result = await authService.register({
      name: "TestUser",
      email: "test@example.com",
      password: "12345678",
    });

    expect(result).toEqual(user);
  });

  it("logs in a user", async () => {
    mockedAxios.post.mockResolvedValueOnce(mockAxiosResponse(loginResponse));

    const result = await authService.login({
      email: "test@example.com",
      password: "12345678",
    });

    expect(result).toEqual(loginResponse);
  });

  it("gets current user info", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockAxiosResponse(user));

    const result = await authService.getMe(token);

    expect(result).toEqual(user);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/me"),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
      })
    );
  });

  it("updates user's name", async () => {
    mockedAxios.put.mockResolvedValueOnce(mockAxiosResponse({}));

    await expect(authService.updateName("NewName", token)).resolves.toBeUndefined();
  });

  it("updates user's password", async () => {
    mockedAxios.put.mockResolvedValueOnce(mockAxiosResponse({}));

    await expect(authService.updatePassword("newpass123", token)).resolves.toBeUndefined();
  });
});
