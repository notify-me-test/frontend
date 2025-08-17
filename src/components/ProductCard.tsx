import React from 'react';
import { Product } from '../types';
import { Card } from './ui';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isLowStock = product.stock_quantity <= 5;
  
  return (
    <Card>
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
        {product.name}
      </h3>
      <div>{product.description}</div>
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#007bff',
        margin: '8px 0'
      }}>
        ${product.price}
      </div>
      <div>Category: {product.category?.name || 'Unknown'}</div>
      <div style={{
        color: isLowStock ? '#dc3545' : '#28a745',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        Stock: {product.stock_quantity} {isLowStock ? '(Low Stock!)' : ''}
      </div>
      <div>SKU: {product.sku}</div>
    </Card>
  );
};

export default ProductCard;
