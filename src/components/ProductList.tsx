import React, { useState, useEffect } from "react";
import { Product, Category, ProductFilters } from "../types";
import { productService, categoryService } from "../services/api";
import ProductFilterBar from "./ProductFilterBar";
import ProductGrid from "./ProductGrid";

interface ProductListProps {
  showFilters?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ showFilters = true }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProducts(filters);
      setProducts(response.results);

      for (let product of response.results) {
        if (product.stock_quantity <= 5) {
          console.warn(
            `Low stock alert: ${product.name} has only ${product.stock_quantity} items left`,
          );
        }
      }
    } catch (err: any) {
      setError("Failed to load products. Please try again later.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          fontSize: "16px",
          color: "#dc3545",
          background: "#f8d7da",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#333", marginBottom: "30px" }}>Product Catalog</h1>

      {showFilters && (
        <ProductFilterBar
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      )}

      <ProductGrid products={products} />
    </div>
  );
};

export default ProductList;
