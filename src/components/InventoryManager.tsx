import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const StockStatus = styled.span<{ status: 'low' | 'medium' | 'high' }>`
  color: ${props => {
    switch (props.status) {
      case 'low': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'high': return '#28a745';
      default: return '#333';
    }
  }};
  font-weight: 500;
`;

const InventoryManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStock, setUpdatingStock] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts();
      setProducts(response.results);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId: number, newStock: number) => {
    try {
      setUpdatingStock(prev => ({ ...prev, [productId]: true }));
      
      const response = await productService.updateStock(productId, newStock);
      
      await loadProducts();
      
      console.log('Stock updated:', response);
    } catch (error) {
      console.error('Failed to update stock:', error);
    } finally {
      setUpdatingStock(prev => ({ ...prev, [productId]: false }));
    }
  };

  const getStockStatus = (quantity: number): 'low' | 'medium' | 'high' => {
    if (quantity <= 5) return 'low';
    if (quantity <= 20) return 'medium';
    return 'high';
  };

  const handleStockChange = (productId: number, value: string) => {
    const newStock = parseInt(value);
    if (isNaN(newStock) || newStock < 0) {
      return;
    }
    updateStock(productId, newStock);
  };

  if (loading) {
    return <Container>Loading inventory...</Container>;
  }

  return (
    <Container>
      <Header>Inventory Management</Header>
      
      <Table>
        <thead>
          <tr>
            <Th>Product Name</Th>
            <Th>SKU</Th>
            <Th>Current Stock</Th>
            <Th>Status</Th>
            <Th>Update Stock</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.sku}</Td>
              <Td>{product.stock_quantity}</Td>
              <Td>
                <StockStatus status={getStockStatus(product.stock_quantity)}>
                  {getStockStatus(product.stock_quantity).toUpperCase()}
                </StockStatus>
              </Td>
              <Td>
                <Input
                  type="number"
                  defaultValue={product.stock_quantity}
                  onBlur={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (newValue !== product.stock_quantity) {
                      handleStockChange(product.id, e.target.value);
                    }
                  }}
                />
                <Button
                  disabled={updatingStock[product.id]}
                  onClick={() => {
                    const input = document.querySelector(`input[defaultValue="${product.stock_quantity}"]`) as HTMLInputElement;
                    if (input) {
                      handleStockChange(product.id, input.value);
                    }
                  }}
                >
                  {updatingStock[product.id] ? 'Updating...' : 'Update'}
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventoryManager;