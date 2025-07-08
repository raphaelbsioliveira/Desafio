import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "./ProductList";
import { fetchProducts } from "../../services/apiService";
import { ProductItems } from "../../types/ProductItems";

jest.mock("../../services/apiService");
jest.mock("../../types/ProductItems", () => ({
  isInWishlist: jest.fn().mockReturnValue(false),
  toggleWishlist: jest.fn(),
}));

const mockedFetchProducts = fetchProducts as jest.MockedFunction<
  typeof fetchProducts
>;

const mockProducts: ProductItems[] = [
  {
    code: "004321",
    name: "Produto Teste 1",
    image: "image1.jpg",
    priceInCents: "1000",
    salePriceInCents: "800",
    rating: 4,
  },
  {
    code: "002657",
    name: "Produto Teste 2",
    image: "image2.jpg",
    priceInCents: "2000",
    salePriceInCents: "1500",
    rating: 5,
  },
];

describe("ProductList Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display a loading message initially", () => {
    mockedFetchProducts.mockResolvedValueOnce(mockProducts);
    render(<ProductList />);
    expect(screen.getByText("Carregando produtos")).toBeInTheDocument();
  });

  test("should display the list of products after a successful fetch", async () => {
    mockedFetchProducts.mockResolvedValueOnce(mockProducts);
    render(<ProductList />);
    await waitFor(() => {
      expect(screen.getByText("Produto Teste 1")).toBeInTheDocument();
      expect(screen.getByText("Produto Teste 2")).toBeInTheDocument();
    });

    expect(screen.queryByText("Carregando produtos")).not.toBeInTheDocument();
  });

  test("should display an empty message when no products are returned", async () => {
    mockedFetchProducts.mockResolvedValueOnce([]);
    render(<ProductList />);
    await waitFor(() => {
      expect(screen.getByText("Nenhum produto encontrado")).toBeInTheDocument();
    });
  });

 test('should display an error message if the fetch fails', async () => {
    console.error = jest.fn();
    mockedFetchProducts.mockRejectedValueOnce(new Error('API Error'));
    render(<ProductList />);
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível carregar os produtos')
      ).toBeInTheDocument();
    });
  });
});
