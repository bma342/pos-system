import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderAsync, selectOrderStatus, selectOrderError } from '../redux/slices/orderSlice';
import { AppDispatch } from '../redux/store';
import { Order } from '../types/orderTypes';
import logger from '../utils/logger';

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderStatus = useSelector(selectOrderStatus);
  const orderError = useSelector(selectOrderError);
  const [orderDetails, setOrderDetails] = useState<Omit<Order, 'id'>>({
    items: [],
    total: 0,
    status: 'pending',
  });

  const handlePlaceOrder = async () => {
    try {
      await dispatch(placeOrderAsync(orderDetails)).unwrap();
      logger.info('Order placed successfully');
      // Handle successful order placement (e.g., redirect to confirmation page)
    } catch (error) {
      logger.error('Error placing order', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Add form inputs to update orderDetails state

  return (
    <div>
      <h2>Checkout</h2>
      {/* Add form inputs for order details */}
      <button onClick={handlePlaceOrder} disabled={orderStatus === 'loading'}>
        {orderStatus === 'loading' ? 'Placing Order...' : 'Place Order'}
      </button>
      {orderError && <p>Error: {orderError}</p>}
    </div>
  );
};

export default Checkout;