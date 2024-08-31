import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { InventoryService } from '../../services/InventoryService';
import { RootState } from '../../redux/store';
import { updateCartItem, removeCartItem } from '../../redux/slices/cartSlice';
import { CartItem } from '../../types/cartTypes';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const inventoryService = useMemo(() => new InventoryService(), []);

  const checkInventory = useCallback(async () => {
    for (const item of cartItems) {
      try {
        const availableQuantity = await inventoryService.checkInventory(
          item.id
        );
        if (availableQuantity < item.quantity) {
          dispatch(updateCartItem({ ...item, quantity: availableQuantity }));
        }
      } catch (error) {
        console.error(`Failed to check inventory for item ${item.id}:`, error);
      }
    }
  }, [cartItems, dispatch, inventoryService]);

  useEffect(() => {
    checkInventory();
  }, [checkInventory]);

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeCartItem(itemId));
  };

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    dispatch(updateCartItem({ ...item, quantity: newQuantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography>{item.name}</Typography>
              <Box>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(item, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </Button>
                <Typography display="inline">{item.quantity}</Typography>
                <Button
                  onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                >
                  +
                </Button>
                <Button onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="primary">
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
