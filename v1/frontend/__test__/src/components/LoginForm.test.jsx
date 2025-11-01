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

   test("shows error message on invalid credentials", async () => {
    // Mock fetch to return error
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Invalid email or password" }),
      })
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for all async operations and state updates to complete
    await waitFor(() => {
      // Check that error message appears
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
      // Check that loading state is false
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    // Verify navigation and fetchUser were not called
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockFetchUser).not.toHaveBeenCalled();
  });

  test("updates button text during login attempt", async () => {
    // Add delay to fetch to simulate network latency
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Login successful" }),
              }),
            100
          )
        )
    );

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

    const submitButton = screen.getByRole("button", { name: /login/i });

    // Submit form
    fireEvent.click(submitButton);

    // Button should show loading state
    expect(screen.getByText("Logging in...")).toBeInTheDocument();

    // Wait for login to complete
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    // Button should return to normal state
    expect(screen.queryByText("Logging in...")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
