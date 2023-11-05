import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../atoms/ProductCard/ProductCard";
import { IProduct } from "../../types/types";

describe("ProductCard component", () => {
    const product: IProduct = {
        id: "1",
        sku: "SKU123",
        imageURL: "https://test.com/image.jpg",
        retailPrice: 12.34,
        description: "Product description",
        cpt: 10,
        jhb: 20,
        dbn: 30,
        totalStock: 100,
        dealerPrice: 9.99,
        manufacturer: "Manufacturer Name",
      };

  it("displays the product SKU", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    const skuElement = screen.getByText(product.sku);
    expect(skuElement).toBeInTheDocument();
  });

  it("displays the product image", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    const imageElement = screen.getByAltText(product.sku);
    expect(imageElement).toBeInTheDocument();
  });
});
