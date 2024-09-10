import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { RootState, AppDispatch } from '../redux/store';
import { fetchGuestRewards } from '../redux/slices/rewardSlice';
import { createOrder } from '../redux/slices/orderSlice';
import { CartItem } from '../types/cartTypes';
import { Order, OrderStatus } from '../types/orderTypes';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { OrderItemModifier } from '../types/orderTypes';
import { User } from '../types/userTypes';

const LazyOrderSummary = lazy(() => import('../components/OrderSummary'));

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const cart = useSelector((state: RootState) => state.cart);
  const { selectedLocation } = useSelectedLocation();
  const [availableRewards, setAvailableRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) {
      dispatch(fetchGuestRewards({ guestId: user.id, clientId: user.clientId }))
        .unwrap()
        .then(setAvailableRewards)
        .catch(console.error);
    }
  }, [dispatch, user]);

  const handleCheckout = () => {
    if (!user || !selectedLocation) return;

    const getCustomerName = (user: User) => {
      if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
      } else if (user.firstName) {
        return user.firstName;
      } else if (user.email) {
        return user.email.split('@')[0]; // Use the part before @ in email
      } else {
        return 'Guest';
      }
    };

    const orderData: Omit<Order, 'id'> = {
      clientId: user.clientId,
      guestId: user.id,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      customerName: getCustomerName(user),
      orderDate: new Date().toISOString(),
      items: cart.items.map(item => ({
        itemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        modifiers: item.modifiers.map(mod => ({
          modifierId: mod.id,
          quantity: 1,
          price: mod.price
        } as OrderItemModifier))
      })),
      totalAmount: calculateTotal(),
      total: calculateTotal(),
      status: OrderStatus.PENDING,
      paymentMethod: 'credit_card',
      appliedRewardId: selectedReward,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(createOrder({ clientId: user.clientId, orderData }));
  };

  const calculateTotal = (): number => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page">
      <Typography variant="h4" component="h1">Checkout</Typography>
      <Suspense fallback={<CircularProgress />}>
        <LazyOrderSummary items={cart.items} total={calculateTotal()} />
      </Suspense>

      <Typography variant="h6" component="h2">Available Rewards:</Typography>
      <div className="rewards-container" role="group" aria-label="Available rewards">
        {availableRewards.map((reward: any) => (
          <Button
            key={reward.id}
            onClick={() => setSelectedReward(reward.id)}
            variant={selectedReward === reward.id ? 'contained' : 'outlined'}
            aria-pressed={selectedReward === reward.id}
          >
            {reward.name}
          </Button>
        ))}
      </div>

      <Button 
        onClick={handleCheckout} 
        variant="contained" 
        color="primary"
        aria-label="Complete order"
        disabled={cart.items.length === 0}
      >
        Complete Order
      </Button>
    </div>
  );
};

export default CheckoutPage;
