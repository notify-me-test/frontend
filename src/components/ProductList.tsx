import React, { useState, useEffect } from 'react';
import { Product, Category, ProductFilters } from '../types';
import { productService, categoryService } from '../services/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 30px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ProductName = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  margin: 8px 0;
`;

const StockInfo = styled.div<{ lowStock: boolean }>`
  color: ${props => props.lowStock ? '#dc3545' : '#28a745'};
  font-size: 14px;
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #dc3545;
  background: #f8d7da;
  border-radius: 8px;
  margin: 20px 0;
`;

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
      console.error('Failed to load categories:', err);
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
          console.warn(`Low stock alert: ${product.name} has only ${product.stock_quantity} items left`);
        }
      }
      
    } catch (err: any) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value
    }));
  };

  if (loading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Header>Product Catalog</Header>
      
      {showFilters && (
        <FiltersContainer>
          <Input
            type="text"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          
          <Select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value ? parseInt(e.target.value) : undefined)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.min_price || ''}
            onChange={(e) => handleFilterChange('min_price', e.target.value ? parseFloat(e.target.value) : undefined)}
          />
          
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.max_price || ''}
            onChange={(e) => handleFilterChange('max_price', e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </FiltersContainer>
      )}

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductName>{product.name}</ProductName>
            <div>{product.description}</div>
            <ProductPrice>${product.price}</ProductPrice>
            <div>Category: {product.category?.name || 'Unknown'}</div>
            <StockInfo lowStock={product.stock_quantity <= 5}>
              Stock: {product.stock_quantity} {product.stock_quantity <= 5 ? '(Low Stock!)' : ''}
            </StockInfo>
            <div>SKU: {product.sku}</div>
          </ProductCard>
        ))}
      </ProductGrid>
      
      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No products found
        </div>
      )}
    </Container>
  );
};

export default ProductList;