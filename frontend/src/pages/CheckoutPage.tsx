import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '../redux/slices/cartSlice';
import { createOrder } from '../api/orderApi';
import { fetchGuestRewards } from '../api/guestApi';
import { OrderType, Reward, Location, User, Order, CartItem } from '../types';
import { Typography, Grid, Paper, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { selectCurrentUser } from '../redux/slices/authSlice';
import { selectSelectedLocation } from '../redux/selectors/locationSelectors';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const selectedLocation = useSelector(selectSelectedLocation) as Location | null;
  const currentUser = useSelector(selectCurrentUser);

  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [kitchenTip, setKitchenTip] = useState<number>(0);
  const [driverTip, setDriverTip] = useState<number>(0);
  const [appliedDiscounts, setAppliedDiscounts] = useState<Reward[]>([]);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchGuestRewards(Number(currentUser.id)).then(setAvailableRewards);
    }
  }, [currentUser]);

  const handleQuantityChange = (clientId: string, locationId: string, menuItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ clientId, locationId, menuItemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (clientId: string, locationId: string, menuItemId: string) => {
    dispatch(removeFromCart({ clientId, locationId, menuItemId }));
  };

  const calculateItemTotal = (item: CartItem) => {
    const itemTotal = item.menuItem.price * item.quantity;
    const modifierTotal = item.selectedModifiers.reduce((sum, mod) => sum + mod.price, 0) * item.quantity;
    return itemTotal + modifierTotal;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * (selectedLocation?.taxRate ?? 0);
  };

  const calculateServiceCharge = (subtotal: number) => {
    const rate = orderType === 'catering' 
      ? selectedLocation?.cateringServiceChargeRate 
      : selectedLocation?.serviceChargeRate;
    return subtotal * (rate ?? 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const serviceCharge = calculateServiceCharge(subtotal);
    const tips = orderType === 'catering' ? kitchenTip + driverTip : 0;
    return subtotal + tax + serviceCharge + tips;
  };

  const handleCheckout = async () => {
    try {
      if (!selectedLocation || !currentUser?.id) {
        throw new Error('Location or user information is missing');
      }
      const orderData: Partial<Order> = {
        items: cartItems,
        orderType: orderType as OrderType,
        locationId: selectedLocation.id,
        guestId: currentUser.id,
        subtotal: calculateSubtotal(),
        tax: calculateTax(calculateSubtotal()),
        serviceCharge: calculateServiceCharge(calculateSubtotal()),
        kitchenTip,
        driverTip,
        total: calculateTotal(),
        appliedDiscounts: appliedDiscounts,
      };
      const response = await createOrder(orderData);
      const orderId = response.data.id;
      dispatch(clearCart());
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Grid container spacing={3} className="checkout-page">
      <Grid item xs={12} md={8} lg={9}>
        {/* Order details */}
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        {/* Order summary */}
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
