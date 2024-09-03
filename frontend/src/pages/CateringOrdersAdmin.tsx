import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Box,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { cateringOrderApi } from '../api/cateringOrderApi';
import { useAuth } from '../contexts/AuthContext';
import {
  CateringOrder,
  OrderStatus,
  OrderStatistics,
} from '../types/cateringOrderTypes';

const CateringOrdersAdmin: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<CateringOrder | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [orderStatistics, setOrderStatistics] = useState<OrderStatistics | null>(null);

  const { clientId } = useParams<{ clientId: string }>();
  const { user } = useAuth();

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery(['cateringOrders', selectedStatus, clientId], () =>
    cateringOrderApi.fetchOrders(clientId, selectedStatus)
  );

  const updateOrderStatusMutation = useMutation(
    ({ orderId, newStatus }: { orderId: number; newStatus: OrderStatus }) =>
      cateringOrderApi.updateOrderStatus(clientId, orderId, newStatus),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cateringOrders', selectedStatus, clientId]);
        setSnackbarMessage('Order status updated successfully');
        setSnackbarOpen(true);
      },
      onError: () => {
        setSnackbarMessage('Failed to update order status');
        setSnackbarOpen(true);
      },
    }
  );

  const deleteOrderMutation = useMutation(
    (orderId: number) => cateringOrderApi.deleteOrder(clientId, orderId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cateringOrders', selectedStatus, clientId]);
        setSnackbarMessage('Order deleted successfully');
        setSnackbarOpen(true);
      },
      onError: () => {
        setSnackbarMessage('Failed to delete order');
        setSnackbarOpen(true);
      },
    }
  );

  const handleStatusChange = useCallback(
    (orderId: number, newStatus: OrderStatus) => {
      updateOrderStatusMutation.mutate({ orderId, newStatus });
    },
    [updateOrderStatusMutation]
  );

  const handleFilterChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setSelectedStatus(event.target.value);
    },
    []
  );

  const handleEditClick = useCallback((order: CateringOrder) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((orderId: number) => {
    setDeletingOrderId(orderId);
    setIsDeleteModalOpen(true);
  }, []);

  const handleEditSubmit = useCallback(() => {
    if (editingOrder) {
      updateOrderStatusMutation.mutate({
        orderId: editingOrder.id,
        newStatus: editingOrder.status,
      });
      setIsEditModalOpen(false);
    }
  }, [editingOrder, updateOrderStatusMutation]);

  const handleDeleteConfirm = useCallback(() => {
    if (deletingOrderId) {
      deleteOrderMutation.mutate(deletingOrderId);
      setIsDeleteModalOpen(false);
    }
  }, [deletingOrderId, deleteOrderMutation]);

  // Calculate order statistics
  useEffect(() => {
    if (orders) {
      const stats: OrderStatistics = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum: number, order: CateringOrder) => sum + order.totalAmount, 0),
        averageOrderValue: orders.length > 0
          ? orders.reduce((sum: number, order: CateringOrder) => sum + order.totalAmount, 0) / orders.length
          : 0,
      };
      setOrderStatistics(stats);
    }
  }, [orders]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error loading orders</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Catering Orders Management
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{orderStatistics?.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${orderStatistics?.totalRevenue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">${orderStatistics?.averageOrderValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Status</InputLabel>
        <Select value={selectedStatus} onChange={handleFilterChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order: CateringOrder) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(order)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" gutterBottom>Edit Order</Typography>
          {editingOrder && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={editingOrder.status}
                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as OrderStatus })}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          )}
          <Button onClick={handleEditSubmit} variant="contained">Save Changes</Button>
        </Box>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" gutterBottom>Confirm Deletion</Typography>
          <Typography>Are you sure you want to delete this order?</Typography>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ mt: 2 }}>Delete</Button>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CateringOrdersAdmin;
