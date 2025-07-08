import React, { useState, useEffect } from "react";
import type { ProductItems } from "../../types/ProductItems";
import * as wishlistService from "../../services/wishlistService";
import GrayHeart from "../../assets/icons/grayheart.svg";
import RedHeart from "../../assets/icons/redheart.svg";
import IconX from "../../assets/images/iconX.png";
import "./Product.css";

interface ProductProps {
  product: ProductItems;
  onWishlistChange?: (productCode: string) => void;
  variant?: "list" | "wishlist";
}

function formatPrice(cents: string) {
  return (Number(cents) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

function Product({
  product,
  onWishlistChange,
  variant = "list",
}: ProductProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlistService.isInWishlist(product.code));
  }, [product.code]);

  function handleButtonClick() {
    wishlistService.toggleWishlist(product.code);
    setIsWishlisted(!isWishlisted);
    if (onWishlistChange) {
      onWishlistChange(product.code);
    }
  }

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <button
          onClick={handleButtonClick}
          className={`wishlist-button ${
            variant === "wishlist" ? "remove-button" : ""
          }`}
        >
          {variant === "wishlist" ? (
            <img src={IconX} alt="Retira da Wishlist" width={25} height={25} />
          ) : isWishlisted ? (
            <img
              src={RedHeart}
              alt="Remover da Wishlist"
              width={25}
              height={25}
            />
          ) : (
            <img
              src={GrayHeart}
              alt="Adicionar à Wishlist"
              width={25}
              height={25}
            />
          )}
        </button>
      </div>
      <div className="product-details">
        <p className="product-name">{truncateText(product.name, 75)}</p>
        <div className="product-rating">
          <span>★★★★★</span>
          <span className="rating-value">{product.rating.toFixed(1)}</span>
        </div>
        <p className="product-price-original">
          {formatPrice(product.priceInCents)}
        </p>
        <p className="product-price-sale">
          {formatPrice(product.salePriceInCents)}
        </p>
      </div>
    </div>
  );
}

export default Product;
