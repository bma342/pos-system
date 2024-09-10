import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  fetchActiveOrders,
  cancelOrder,
  markItemOutOfStock,
  selectActiveOrders,
} from '../../redux/slices/orderSlice';
import { Order, OrderItem } from '../../types/orderTypes';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, List, ListItem, Button, Grid, Paper } from '@mui/material';

const TabletOrderManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeOrders = useSelector(selectActiveOrders);
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user?.locationId) {
      dispatch(fetchActiveOrders(user.locationId));
    }
  }, [dispatch, user]);

  const handleCancelOrder = (orderId: string) => {
    dispatch(cancelOrder(orderId));
  };

  const handleMarkItemOutOfStock = (orderId: string, itemId: string) => {
    dispatch(markItemOutOfStock({ orderId, itemId }));
  };

  const renderOrderItem = (order: Order) => (
    <ListItem key={order.id} button onClick={() => setSelectedOrder(order)}>
      <Box>
        <Typography variant="subtitle1">Order #{order.id}</Typography>
        <Typography variant="body2">Status: {order.status}</Typography>
        <Typography variant="body2">Total: ${order.total.toFixed(2)}</Typography>
        <Typography variant="body2">Estimated Completion: {order.estimatedCompletionTime}</Typography>
      </Box>
    </ListItem>
  );

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">Order #{selectedOrder.id} Details</Typography>
        <Typography>Status: {selectedOrder.status}</Typography>
        <Typography>Total: ${selectedOrder.total.toFixed(2)}</Typography>
        <Typography>Estimated Completion: {selectedOrder.estimatedCompletionTime}</Typography>
        <List>
          {selectedOrder.items.map((item: OrderItem) => (
            <ListItem key={item.id}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography>{item.name} x{item.quantity}</Typography>
                <Button onClick={() => handleMarkItemOutOfStock(selectedOrder.id, item.id)}>
                  Mark Out of Stock
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="secondary" onClick={() => handleCancelOrder(selectedOrder.id)}>
          Cancel Order
        </Button>
      </Paper>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ height: '100vh', overflowY: 'auto' }}>
          <List>
            {activeOrders.map(renderOrderItem)}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        {renderOrderDetails()}
      </Grid>
    </Grid>
  );
};

export default TabletOrderManager;
