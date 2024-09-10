import React from 'react';
import { Typography } from '@mui/material';
import { CartItem } from '../types/cartTypes';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="order-summary">
      <Typography variant="h6" component="h2">Order Summary:</Typography>
      <ul aria-label="Order items">
        {items.map((item: CartItem) => (
          <li key={item.id}>
            <Typography>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </Typography>
          </li>
        ))}
      </ul>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
    </div>
  );
};

export default OrderSummary;