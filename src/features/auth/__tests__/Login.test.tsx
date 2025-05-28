import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { useAuth } from "../AuthContext";
import "@testing-library/jest-dom";

//  Cleanup after each test to prevent DOM duplication
afterEach(() => {
  cleanup();
});

//  Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock useAuth from AuthContext
vi.mock("../AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Shared login mock
const mockLogin = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useAuth as unknown as Mock).mockReturnValue({ login: mockLogin });
});

describe("Login component", () => {
  it("renders and accepts user input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getAllByPlaceholderText("Email")[0];
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls login and navigates on success", async () => {
    mockLogin.mockResolvedValueOnce(undefined); // simulate success

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getAllByPlaceholderText("Email")[0], {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockNavigate).toHaveBeenCalledWith("/post-login");
    });
  });

  it("shows error on login failure", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getAllByPlaceholderText("Email")[0], {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
