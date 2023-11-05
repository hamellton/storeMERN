import { render, screen } from "@testing-library/react";
import useAuth from "../../hooks/useAuth";
import { MemoryRouter } from "react-router-dom";
import Header from "../organisms/Header/Header";

jest.mock("../../hooks/useAuth");

describe("Header component", () => {
  it("displays 'Login' when not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const loginElement = screen.getByText("Login");
    expect(loginElement).toBeInTheDocument();
  });

  it("displays 'Products' when authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const productsElement = screen.getByText("Products");
    expect(productsElement).toBeInTheDocument();
  });

  it("displays 'Logout' when authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutElement = screen.getByText("Logout");
    expect(logoutElement).toBeInTheDocument();
  });
});
