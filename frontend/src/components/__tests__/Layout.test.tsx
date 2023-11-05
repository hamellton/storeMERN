import { render, screen } from "@testing-library/react";
import Layout from "../organisms/Layout/Layout";

describe("Layout component", () => {
  it("displays the Header and Footer components", () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const headerElement = screen.getByText("Logo");
    const footerElement = screen.getByTestId("footer-container");

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  it("displays the content", () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const contentElement = screen.getByText("Content");

    expect(contentElement).toBeInTheDocument();
  });
});
