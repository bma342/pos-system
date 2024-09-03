import React from 'react';
import { Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <Paper
      elevation={3}
      style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}
    >
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Typography variant="h6" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography>
        Your order number is: <strong>{orderId}</strong>
      </Typography>
      <Typography>
        We&apos;ve sent a confirmation email with your order details.
      </Typography>
    </Paper>
  );
};

export default OrderConfirmation;
