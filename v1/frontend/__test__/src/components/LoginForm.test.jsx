import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../../../src/pages/login/Login";
import * as AuthContext from "../../../src/context/AuthContext";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Form", () => {
  const mockFetchUser = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock useAuth
    jest.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
      fetchUser: mockFetchUser,
      user: null,
      loading: false,
    }));

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Login successful" }),
      })
    );
  });

  afterEach(() => {
    // Clean up
    jest.restoreAllMocks();
    delete global.fetch;
  });

  test("calls fetchUser after successful login", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "12345" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      expect(mockFetchUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    // Verify fetch was called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "12345",
        }),
        credentials: "include",
      })
    );
  });
});
