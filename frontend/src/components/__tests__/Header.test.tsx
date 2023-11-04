import { render, screen } from "@testing-library/react";
import Header from "../organisms/Header/Header";

test("Header renders without errors", () => {
  render(<Header />);
  expect(screen.getByText("Logo")).toBeInTheDocument();
});

test("Header displays the logo", () => {
  render(<Header />);
  const logo = screen.getByText("Logo");
  expect(logo).toBeInTheDocument();
});

test("Header displays 'Products' in desktop mode", () => {
  render(<Header />);
  const products = screen.getByText("Products");
  expect(products).toBeInTheDocument();
});

test("Header displays 'Login' in desktop mode", () => {
  render(<Header />);
  const login = screen.getByText("Login");
  expect(login).toBeInTheDocument();
});
