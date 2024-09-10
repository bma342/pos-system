import React, { useEffect, lazy, Suspense, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenuItemsAsync } from '../redux/slices/menuItemsSlice';
import { addToCart, removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';
import { useSelectedClient } from '../hooks/useSelectedClient';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { MenuItem, Modifier } from '../types/menuTypes';
import { CartItem } from '../types/cartTypes';
import { Typography, Button, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const LazyMenuItemComponent = lazy(() => import('../components/MenuItemComponent'));

const OrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId, locationId } = useParams<{ clientId: string; locationId: string }>();
  const menuItems = useSelector((state: RootState) => state.menuItems.items);
  const loading = useSelector((state: RootState) => state.menuItems.status === 'loading');
  const error = useSelector((state: RootState) => state.menuItems.error);
  const cart = useSelector((state: RootState) => state.cart.items);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();
  const { selectedLocation } = useSelectedLocation();

  useEffect(() => {
    if (clientId && locationId) {
      dispatch(fetchMenuItemsAsync({ clientId, locationId }));
    }
  }, [dispatch, clientId, locationId]);

  const handleAddToCart = (item: MenuItem, quantity: number, modifiers: Modifier[]) => {
    if (!user || !selectedLocation) return;

    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      clientId: user.clientId,
      locationId: selectedLocation.id,
      modifiers,
      menuItem: item // Add this line
    };

    dispatch(addToCart(cartItem));
  };

  const handleRemoveFromCart = (menuItemId: string) => {
    if (clientId && locationId) {
      dispatch(removeFromCart({ clientId, locationId, menuItemId }));
    }
  };

  const handleUpdateQuantity = (menuItemId: string, quantity: number) => {
    if (clientId && locationId) {
      dispatch(updateCartItemQuantity({ clientId, locationId, menuItemId, quantity }));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const memoizedMenuItems = useMemo(() => menuItems.map(item => (
    <LazyMenuItemComponent 
      key={item.id} 
      item={item}
      onAddToCart={(quantity, modifiers) => handleAddToCart(item, quantity, modifiers)}
    />
  )), [menuItems, handleAddToCart]);

  return (
    <Box className="order-page" sx={{ p: isMobile ? 1 : 2 }}>
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12} md={isMobile ? 12 : 8}>
          <Typography variant="h5" component="h2" gutterBottom>
            Menu Items
          </Typography>
          <Suspense fallback={<LoadingSpinner />}>
            {memoizedMenuItems}
          </Suspense>
        </Grid>
        <Grid item xs={12} md={isMobile ? 12 : 4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Cart
          </Typography>
          {cart.map(item => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography>{item.menuItem.name} - Quantity: {item.quantity}</Typography>
              <Button 
                onClick={() => handleRemoveFromCart(item.id)}
                aria-label={`Remove ${item.menuItem.name} from cart`}
              >
                Remove
              </Button>
              <Button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.menuItem.name}`}
              >
                +
              </Button>
              <Button 
                onClick={() => handleUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                aria-label={`Decrease quantity of ${item.menuItem.name}`}
              >
                -
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderPage;