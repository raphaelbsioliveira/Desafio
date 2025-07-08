import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Product from "./Product";
import { ProductItems } from "../../types/ProductItems";
import * as wishlistService from "../../services/wishlistService";

jest.mock("../../services/wishlistService");

const mockProduct: ProductItems = {
  code: "bjyki-13285",
  name: "Tênis",
  image: "tenis-image.jpg",
  priceInCents: "25000",
  salePriceInCents: "19990",
  rating: 5.0,
};

describe("Componente Product", () => {
  const mockedWishlistService = wishlistService as jest.Mocked<
    typeof wishlistService
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the variant is "list"', () => {
    test("should render gray heart if item is not in wishlist", () => {
      mockedWishlistService.isInWishlist.mockReturnValue(false);
      render(<Product product={mockProduct} />);
      expect(screen.getByAltText("Adicionar à Wishlist")).toBeInTheDocument();
    });

    test("should render red heart if item is already in wishlist", () => {
      mockedWishlistService.isInWishlist.mockReturnValue(true);
      render(<Product product={mockProduct} />);
      expect(screen.getByAltText("Remover da Wishlist")).toBeInTheDocument();
    });

    test("should call toggleWishlist when clicking the button", () => {
      render(<Product product={mockProduct} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockedWishlistService.toggleWishlist).toHaveBeenCalledWith(
        mockProduct.code
      );
      expect(mockedWishlistService.toggleWishlist).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the variant is "wishlist"', () => {
    test('should render the "X" icon to remove', () => {
      render(<Product product={mockProduct} variant="wishlist" />);
      expect(screen.getByAltText("Retira da Wishlist")).toBeInTheDocument();
    });

    test("should call onWishlistChange when clicking remove button", () => {
      const onWishlistChangeMock = jest.fn();

      render(
        <Product
          product={mockProduct}
          variant="wishlist"
          onWishlistChange={onWishlistChangeMock}
        />
      );

      const removeButton = screen.getByRole("button");
      fireEvent.click(removeButton);
      expect(onWishlistChangeMock).toHaveBeenCalledWith(mockProduct.code);
      expect(onWishlistChangeMock).toHaveBeenCalledTimes(1);
      expect(mockedWishlistService.toggleWishlist).toHaveBeenCalledWith(
        mockProduct.code
      );
    });
  });
});
