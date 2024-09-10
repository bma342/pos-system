import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders, updateOrder } from '../redux/slices/orderSlice';
import { selectSelectedLocation } from '../redux/slices/userSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';

interface Order {
  id: string;
  locationName: string; // Add this
  customerName: string;
  orderDate: string; // Add this
  totalAmount: number; // Add this
  total: number;
  status: string;
}

const OrderManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLocation = useSelector(selectSelectedLocation);
  const orders = useSelector((state: RootState) => state.order.orders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchOrders(selectedLocation))
        .then(() => setLoading(false))
        .catch((error: Error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        });
    }
  }, [dispatch, selectedLocation]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    dispatch(updateOrder({ orderId, status: newStatus }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: Order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.locationName}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as string)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderManagement;
