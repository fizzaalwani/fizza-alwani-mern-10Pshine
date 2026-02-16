import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { vi } from "vitest";
import API from "../services/api";
import React from "react";

vi.mock("../services/api");

const TestComponent = () => {
  const { user, login } = useAuth();

  return (
    <div>
      <span>{user ? user.name : "No User"}</span>
      <button onClick={() => login("test@test.com", "123456")}>
        Login
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("login sets user correctly", async () => {
    API.post.mockResolvedValue({
      data: {
        success: true,
        accessToken: "fakeToken",
        user: { name: "Ali" }
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Ali")).toBeInTheDocument();
    });

    expect(localStorage.getItem("accessToken")).toBe("fakeToken");
  });
});
