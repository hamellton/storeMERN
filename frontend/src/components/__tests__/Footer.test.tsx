import { render, screen } from "@testing-library/react";
import useDevice from "../../hooks/useDevice";
import Footer from "../organisms/Footer/Footer";

jest.mock("../../hooks/useDevice");

describe("Footer component", () => {
  it("displays the Footer component", () => {
    (useDevice as jest.Mock).mockReturnValue({ device: "desktop" });

    render(<Footer />);
    const footerContainer = screen.getByTestId("footer-container");

    expect(footerContainer).toBeInTheDocument();
  });

  it("displays the Footer component for mobile", () => {
    (useDevice as jest.Mock).mockReturnValue({ device: "mobile" });

    render(<Footer />);
    const footerContainer = screen.getByTestId("footer-container");

    expect(footerContainer).toBeInTheDocument();
  });
});
