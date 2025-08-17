import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { Product, Category } from '../../types';

const mockCategory: Category = {
  id: 1,
  name: 'Electronics'
};

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'A test product description',
  price: 99.99,
  stock_quantity: 10,
  sku: 'TEST-001',
  category: mockCategory,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z'
};

const mockProductLowStock: Product = {
  ...mockProduct,
  id: 2,
  name: 'Low Stock Product',
  stock_quantity: 3,
  sku: 'LOW-001'
};

const mockProductNoCategory: Product = {
  ...mockProduct,
  id: 3,
  name: 'No Category Product',
  category: undefined,
  sku: 'NOCAT-001'
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Category: Electronics')).toBeInTheDocument();
    expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    expect(screen.getByText('SKU: TEST-001')).toBeInTheDocument();
  });

  it('shows low stock warning when stock is 5 or less', () => {
    render(<ProductCard product={mockProductLowStock} />);

    expect(screen.getByText('Stock: 3 (Low Stock!)')).toBeInTheDocument();
  });

  it('does not show low stock warning when stock is above 5', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    expect(screen.queryByText('(Low Stock!)')).not.toBeInTheDocument();
  });

  it('handles products without category gracefully', () => {
    render(<ProductCard product={mockProductNoCategory} />);

    expect(screen.getByText('Category: Unknown')).toBeInTheDocument();
  });

  it('applies correct styling for low stock products', () => {
    render(<ProductCard product={mockProductLowStock} />);

    const stockElement = screen.getByText('Stock: 3 (Low Stock!)');
    expect(stockElement).toHaveStyle({ color: '#dc3545' });
  });

  it('applies correct styling for normal stock products', () => {
    render(<ProductCard product={mockProduct} />);

    const stockElement = screen.getByText('Stock: 10');
    expect(stockElement).toHaveStyle({ color: '#28a745' });
  });

  it('renders price with correct styling', () => {
    render(<ProductCard product={mockProduct} />);

    const priceElement = screen.getByText('$99.99');
    expect(priceElement).toHaveStyle({
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#007bff'
    });
  });

  it('renders product name with correct styling', () => {
    render(<ProductCard product={mockProduct} />);

    const nameElement = screen.getByText('Test Product');
    expect(nameElement).toHaveStyle({
      margin: '0 0 8px 0',
      color: '#333'
    });
  });
});
