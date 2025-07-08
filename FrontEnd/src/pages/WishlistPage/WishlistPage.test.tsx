import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import WishlistPage from "./WishlistPage";
import { fetchProducts } from "../../services/apiService";
import * as wishlistService from "../../services/wishlistService";
import { ProductItems } from "../../types/ProductItems";

jest.mock("../../services/apiService");
jest.mock("../../services/wishlistService");

const mockedFetchProducts = fetchProducts as jest.MockedFunction<
  typeof fetchProducts
>;
const mockedWishlistService = wishlistService as jest.Mocked<
  typeof wishlistService
>;

const mockAllProducts: ProductItems[] = [
  {
    code: "001-rwc",
    name: "Produto Favorito 1",
    image: "img1.jpg",
    priceInCents: "100",
    salePriceInCents: "95",
    rating: 5,
  },
  {
    code: "002-fcd",
    name: "Produto Favorito 2",
    image: "img2.jpg",
    priceInCents: "200",
    salePriceInCents: "190",
    rating: 5,
  },
  {
    code: "003-wqs",
    name: "Produto Não Favorito",
    image: "img3.jpg",
    priceInCents: "300",
    salePriceInCents: "250",
    rating: 5,
  },
];

describe("WishlistPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should display a loading message initially", () => {
    mockedFetchProducts.mockResolvedValueOnce(mockAllProducts);
    render(<WishlistPage />);
    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });

  test("should display only the wishlisted products after a successful fetch", async () => {
    mockedFetchProducts.mockResolvedValueOnce(mockAllProducts);
    mockedWishlistService.getWishlist.mockReturnValue(["001-rwc", "002-fcd"]);
    render(<WishlistPage />);
    await waitFor(() => {
      expect(screen.getByText("Produto Favorito 1")).toBeInTheDocument();
      expect(screen.getByText("Produto Favorito 2")).toBeInTheDocument();
    });
    expect(screen.queryByText("Produto Não Favorito")).not.toBeInTheDocument();
  });

  test("should display an empty message when the wishlist is empty", async () => {
    mockedFetchProducts.mockResolvedValueOnce(mockAllProducts);
    mockedWishlistService.getWishlist.mockReturnValue([]);
    render(<WishlistPage />);
    await waitFor(() => {
      expect(
        screen.getByText("Sua lista de desejos está vazia.")
      ).toBeInTheDocument();
    });
  });

  test("should remove a product from the view when its remove button is clicked", async () => {
    mockedFetchProducts.mockResolvedValueOnce(mockAllProducts);
    mockedWishlistService.getWishlist.mockReturnValue(["001-rwc", "002-fcd"]);
    render(<WishlistPage />);
    let productToRemove;
    await waitFor(() => {
      productToRemove = screen.getByText("Produto Favorito 1");
      expect(productToRemove).toBeInTheDocument();
    });
    const removeButton = screen.getAllByAltText("Retira da Wishlist")[0];
    fireEvent.click(removeButton);
    expect(screen.queryByText("Produto Favorito 1")).not.toBeInTheDocument();
    expect(screen.getByText("Produto Favorito 2")).toBeInTheDocument();
  });

  test("should display an empty message if the product fetch fails", async () => {
    console.error = jest.fn();
    mockedFetchProducts.mockRejectedValueOnce(new Error("API Error"));
    render(<WishlistPage />);
    await waitFor(() => {
      expect(
        screen.getByText("Sua lista de desejos está vazia.")
      ).toBeInTheDocument();
    });
  });
});
