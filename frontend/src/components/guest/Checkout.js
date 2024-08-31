import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import PaymentForm from './PaymentForm';
import { apiCall } from '../../services/api';
import { handleApiError } from '../../utils/errorHandler';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      // Redirect to cart page or show a message
      console.log('Cart is empty');
    }
  }, [cart]);

  const handleCheckout = async (paymentDetails) => {
    try {
      const response = await apiCall({
        method: 'POST',
        url: '/orders',
        data: {
          userId: user.id,
          items: cart,
          total: total,
          paymentDetails: paymentDetails,
        },
      });

      if (response.success) {
        setOrderPlaced(true);
        clearCart();
      } else {
        setError('Failed to place order. Please try again.');
      }
    } catch (err) {
      handleApiError(err);
      setError('An error occurred. Please try again later.');
    }
  };

  if (orderPlaced) {
    return <div>Thank you for your order!</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      {error && <div className="error">{error}</div>}
      <div className="cart-summary">
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </div>
        ))}
        <div>
          <strong>Total: ${total}</strong>
        </div>
      </div>
      <PaymentForm onSubmit={handleCheckout} />
    </div>
  );
};

export default Checkout;
