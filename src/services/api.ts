import axios from "axios";
import {
  Product,
  Category,
  ProductReview,
  ApiResponse,
  ProductFilters,
} from "../types";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<ApiResponse<Product>> {
    const params = new URLSearchParams();

    if (filters?.category)
      params.append("category", filters.category.toString());
    if (filters?.search) params.append("search", filters.search);
    if (filters?.min_price)
      params.append("min_price", filters.min_price.toString());
    if (filters?.max_price)
      params.append("max_price", filters.max_price.toString());
    if (filters?.is_active !== undefined)
      params.append("is_active", filters.is_active.toString());

    const response = await api.get(`/products/?${params.toString()}`);
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await api.post("/products/", product);
    return response.data;
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await api.put(`/products/${id}/`, product);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}/`);
  },

  async updateStock(id: number, stock_quantity: number): Promise<any> {
    const response = await api.post(`/products/${id}/update_stock/`, {
      stock_quantity,
    });
    return response.data;
  },

  async getLowStockProducts(threshold?: number): Promise<Product[]> {
    const params = threshold ? `?threshold=${threshold}` : "";
    const response = await api.get(`/products/low_stock/${params}`);
    return response.data;
  },
};

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get("/categories/");
    return response.data.results || response.data;
  },

  async getCategory(id: number): Promise<Category> {
    const response = await api.get(`/categories/${id}/`);
    return response.data;
  },

  async createCategory(category: Partial<Category>): Promise<Category> {
    const response = await api.post("/categories/", category);
    return response.data;
  },
};

export const reviewService = {
  async getReviews(productId?: number): Promise<ProductReview[]> {
    const params = productId ? `?product=${productId}` : "";
    const response = await api.get(`/reviews/${params}`);
    return response.data.results || response.data;
  },

  async createReview(review: Partial<ProductReview>): Promise<ProductReview> {
    const response = await api.post("/reviews/", review);
    return response.data;
  },
};

export const searchService = {
  async searchProducts(query: string): Promise<Product[]> {
    const response = await api.get(`/search/?q=${encodeURIComponent(query)}`);
    return response.data.results || response.data;
  },
};
