import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchOrders } from '../../redux/slices/orderSlice';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const OrderManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h5">Order Manager</Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Order #${order.id}`}
              secondary={`Total: $${order.total}`}
            />
            <Button>View Details</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrderManager;
