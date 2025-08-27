export interface Category {
  id: number;
  name: string;
  description: string;
  parent?: number;
}

export interface ProductImage {
  id: number;
  product: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: Category;
  stock_quantity: number;
  sku: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  category_name?: string;
}

export interface ProductReview {
  id: number;
  product: number;
  user: number;
  rating: number;
  comment: string;
  created_at: string;
  user_name?: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ProductFilters {
  category?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  is_active?: boolean;
}
