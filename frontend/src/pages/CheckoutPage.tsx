import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { createOrder } from '../redux/slices/orderSlice';
import { useAuth } from '../hooks/useAuth';
import { fetchGuestRewards } from '../redux/slices/rewardSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { Order } from '../types/orderTypes';
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = useSelector((state: RootState) => state.cart);
  const selectedLocation = useSelector((state: RootState) => state.location.selectedLocation);
  const [availableRewards, setAvailableRewards] = useState<any[]>([]);
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      fetchGuestRewards(user.id).then(setAvailableRewards);
    }
  }, [user]);

  const handleCheckout = async () => {
    if (!selectedLocation || !user?.id) {
      alert('Please select a location and ensure you are logged in.');
      return;
    }

    const orderData: Omit<Order, 'id'> = {
      userId: user.id,
      locationId: selectedLocation.id,
      items: cart.items,
      total: cart.total,
      status: 'pending',
      paymentMethod,
      appliedRewardId: selectedReward,
    };

    try {
      const response = await dispatch(createOrder({ clientId: user.clientId, orderData })).unwrap();
      dispatch(clearCart());
      navigate(`/order-confirmation/${response.id}`);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  if (!selectedLocation) {
    return <Typography>Please select a location before proceeding to checkout.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Typography variant="h6">Order Summary</Typography>
      {cart.items.map((item) => (
        <Typography key={item.id}>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Typography>
      ))}
      <Typography variant="h6">Total: ${cart.total.toFixed(2)}</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Apply Reward</InputLabel>
        <Select
          value={selectedReward}
          onChange={(e) => setSelectedReward(e.target.value as string)}
        >
          <MenuItem value="">None</MenuItem>
          {availableRewards.map((reward) => (
            <MenuItem key={reward.id} value={reward.id}>{reward.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as string)}
        >
          <MenuItem value="credit_card">Credit Card</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
          <MenuItem value="cash">Cash</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        disabled={cart.items.length === 0 || !paymentMethod}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default CheckoutPage;
