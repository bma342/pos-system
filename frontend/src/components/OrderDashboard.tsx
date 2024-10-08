import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders, updateOrder } from '../redux/slices/orderSlice';
import { selectSelectedLocation, selectCurrentUser } from '../redux/slices/userSlice';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Select, MenuItem, Typography, CircularProgress, Box, Tabs, Tab
} from '@mui/material';
import LocationSelector from './LocationSelector';
import { UserRole } from '../types/userTypes'; // Make sure this import exists

interface Order {
  id: string;
  locationName: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  total: number; // Add this for compatibility with OrderManagement
  status: string;
}

const OrderDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, status, error } = useSelector((state: RootState) => state.order);
  const selectedLocation = useSelector(selectSelectedLocation);
  const user = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchOrders(selectedLocation));
    }
  }, [dispatch, selectedLocation]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    dispatch(updateOrder({ orderId, status: newStatus }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Order Dashboard</Typography>
      {user?.role === UserRole.GLOBAL_ADMIN && <LocationSelector />}
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="All Orders" />
        <Tab label="Pending" />
        <Tab label="In Progress" />
        <Tab label="Completed" />
      </Tabs>

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter(order => {
                if (activeTab === 0) return true;
                if (activeTab === 1) return order.status === 'pending';
                if (activeTab === 2) return order.status === 'in_progress';
                if (activeTab === 3) return order.status === 'completed';
                return true;
              })
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.locationName}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as string)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in_progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDashboard;
