import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../ProductList';
import { productService, categoryService } from '../../services/api';

// Mock the API services
jest.mock('../../services/api');

const mockProductService = productService as jest.Mocked<typeof productService>;
const mockCategoryService = categoryService as jest.Mocked<typeof categoryService>;

const mockProducts = [
  {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: '99.99',
    category: { id: 1, name: 'Electronics', description: 'Electronic devices', parent: undefined },
    stock_quantity: 10,
    sku: 'TEST001',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }
];

const mockCategories = [
  { id: 1, name: 'Electronics', description: 'Electronic devices', parent: undefined }
];

describe('ProductList Component', () => {
  beforeEach(() => {
    mockProductService.getProducts.mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: mockProducts
    });
    
    mockCategoryService.getCategories.mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders product list', async () => {
    render(<ProductList />);
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Product Catalog')).toBeInTheDocument();
    });
  });

  test('displays products after loading', async () => {
    render(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });
  });

  // Missing tests:
  // - Filter functionality
  // - Search functionality  
  // - Error handling
  // - Loading states
  // - Empty state
  // - Category filtering
  // - Price filtering
  // - Stock status display
  // - User interactions
});