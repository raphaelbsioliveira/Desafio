import React, { useState, useEffect } from "react";
import { ProductItems } from "../../types/ProductItems";
import Product from "../../Components/Product/Product";
import { fetchProducts } from "../../services/apiService";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState<ProductItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar os produtos");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  function renderContent() {
    if (isLoading) {
      return <p>Carregando produtos</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (products.length === 0) {
      return <p>Nenhum produto encontrado</p>;
    }

    return (
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product.code} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Home</h2>
      {renderContent()}
    </div>
  );
}

export default ProductList;
