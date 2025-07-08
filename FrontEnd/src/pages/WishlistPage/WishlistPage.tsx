import React, { useState, useEffect } from "react";
import { ProductItems } from "../../types/ProductItems";
import * as wishlistService from "../../services/wishlistService";
import { fetchProducts } from "../../services/apiService";
import Product from "../../Components/Product/Product";
import "./WishlistPage.css";

function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<ProductItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const allProducts = await fetchProducts();
        const wishlistCodes = wishlistService.getWishlist();
        const filteredProducts = allProducts.filter((product) =>
          wishlistCodes.includes(product.code)
        );
        setWishlistProducts(filteredProducts);
      } catch (error) {
        console.error("Erro ao carregar a wishlist", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, []);

  function handleWishlistUpdate(removedProductCode: string) {
    setWishlistProducts((currentProducts) =>
      currentProducts.filter((product) => product.code !== removedProductCode)
    );
  }
  return (
    <div>
      <h2 className="page-title">
        <span style={{ fontWeight: "normal" }}>Home / </span>
        Wishlist
      </h2>
      {isLoading && <p>Carregando</p>}
      {!isLoading && wishlistProducts.length === 0 && (
        <p className="empty-wishlist-message">
          Sua lista de desejos está vazia.
        </p>
      )}

      {!isLoading && wishlistProducts.length > 0 && (
        <div className="product-grid">
          {wishlistProducts.map((product) => (
            <Product
              key={product.code}
              product={product}
              onWishlistChange={handleWishlistUpdate}
              variant="wishlist"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
