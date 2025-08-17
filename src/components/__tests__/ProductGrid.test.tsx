import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { Product, Category } from '../../types';

const mockCategory: Category = {
  id: 1,
  name: 'Electronics'
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    stock_quantity: 10,
    sku: 'SKU-001',
    category: mockCategory,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    stock_quantity: 5,
    sku: 'SKU-002',
    category: mockCategory,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

describe('ProductGrid', () => {
  it('renders all products when products array is not empty', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('shows no products message when products array is empty', () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('applies correct grid styling', () => {
    render(<ProductGrid products={mockProducts} />);

    const gridContainer = screen.getByText('Product 1').closest('div')?.parentElement;
    expect(gridContainer).toHaveStyle({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    });
  });

  it('renders correct number of product cards', () => {
    render(<ProductGrid products={mockProducts} />);

    // Each product should be rendered in a Card component
    const productCards = screen.getAllByText(/Product \d/);
    expect(productCards).toHaveLength(2);
  });

  it('handles single product correctly', () => {
    const singleProduct = [mockProducts[0]];
    render(<ProductGrid products={singleProduct} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('maintains product order as provided', () => {
    render(<ProductGrid products={mockProducts} />);

    const productElements = screen.getAllByText(/Product \d/);
    expect(productElements[0]).toHaveTextContent('Product 1');
    expect(productElements[1]).toHaveTextContent('Product 2');
  });
});
