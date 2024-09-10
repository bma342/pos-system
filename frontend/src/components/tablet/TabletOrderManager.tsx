import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, List, ListItem, Button, Box } from '@mui/material';
import {
  fetchActiveOrders,
  cancelOrder,
  markItemOutOfStock,
  selectActiveOrders,
} from '../../redux/slices/orderSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { Order, OrderItem } from '../../types/orderTypes';
import { useSelectedClient } from '../../hooks/useSelectedClient';

const TabletOrderManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedClient = useSelectedClient();
  const activeOrders = useSelector(selectActiveOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (selectedClient) {
      dispatch(fetchActiveOrders(selectedClient.id.toString()));
      const interval = setInterval(() => {
        dispatch(fetchActiveOrders(selectedClient.id.toString()));
      }, 30000); // Fetch active orders every 30 seconds
      return () => clearInterval(interval);
    }
  }, [dispatch, selectedClient]);

  const handleCancelOrder = (orderId: string) => {
    if (selectedClient) {
      dispatch(cancelOrder({ clientId: selectedClient.id.toString(), orderId }));
    }
  };

  const handleMarkItemOutOfStock = (orderId: string, itemId: string) => {
    if (selectedClient) {
      dispatch(markItemOutOfStock({ clientId: selectedClient.id.toString(), orderId, itemId }));
    }
  };

  const renderOrderItem = (order: Order) => (
    <ListItem key={order.id} onClick={() => setSelectedOrder(order)}>
      <Box>
        <Typography variant="h6">Order #{order.id}</Typography>
        <Typography variant="body2">Status: {order.status}</Typography>
        <Typography variant="body2">Total: ${order.totalAmount.toFixed(2)}</Typography>
      </Box>
    </ListItem>
  );

  return (
    <Box>
      <Typography variant="h4">Active Orders</Typography>
      <List>
        {activeOrders.map(renderOrderItem)}
      </List>
      {selectedOrder && (
        <Box>
          <Typography variant="h5">Order Details</Typography>
          <Typography>Order #{selectedOrder.id}</Typography>
          <Typography>Status: {selectedOrder.status}</Typography>
          <Typography>Total: ${selectedOrder.totalAmount.toFixed(2)}</Typography>
          <Typography>Items:</Typography>
          <List>
            {selectedOrder.items.map((item: OrderItem) => (
              <ListItem key={item.itemId}>
                <Box>
                  <Typography>{item.name} x{item.quantity}</Typography>
                  <Button onClick={() => handleMarkItemOutOfStock(selectedOrder.id, item.itemId)}>
                    Mark Out of Stock
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          <Button onClick={() => handleCancelOrder(selectedOrder.id)}>Cancel Order</Button>
        </Box>
      )}
    </Box>
  );
};

export default TabletOrderManager;
