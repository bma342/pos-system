import React, { useCallback, useMemo, useState } from 'react';
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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { CateringOrderService } from '../services/CateringOrderService';
import { useAuth } from '../contexts/AuthContext';
import {
  CateringOrder,
  OrderStatus,
  OrderStatistics,
} from '../types/cateringTypes';

const CateringOrdersAdmin: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<CateringOrder | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [orderStatistics, setOrderStatistics] =
    useState<OrderStatistics | null>(null);

  const { clientId } = useParams<{ clientId: string }>();
  const { user } = useAuth();

  const cateringOrderService = useMemo(() => new CateringOrderService(), []);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery(['cateringOrders', selectedStatus], () =>
    cateringOrderService.fetchOrders(clientId, selectedStatus)
  );

  const updateOrderStatusMutation = useMutation(
    ({ orderId, newStatus }: { orderId: number; newStatus: OrderStatus }) =>
      cateringOrderService.updateOrderStatus(clientId, orderId, newStatus),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cateringOrders', selectedStatus]);
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
    (orderId: number) => cateringOrderService.deleteOrder(clientId, orderId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cateringOrders', selectedStatus]);
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
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedStatus(event.target.value as string);
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
  React.useEffect(() => {
    if (orders) {
      const stats: OrderStatistics = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(
          (order) => order.status === OrderStatus.PENDING
        ).length,
        completedOrders: orders.filter(
          (order) => order.status === OrderStatus.DELIVERED
        ).length,
        cancelledOrders: orders.filter(
          (order) => order.status === OrderStatus.CANCELLED
        ).length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      };
      setOrderStatistics(stats);
    }
  }, [orders]);

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading catering orders</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {user.restaurantName} - Catering Orders Admin
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search Orders"
            variant="outlined"
            fullWidth
            // Implement search functionality
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Status</InputLabel>
            <Select value={selectedStatus} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              {Object.values(OrderStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {orderStatistics && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1">
              Total Orders: {orderStatistics.totalOrders}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1">
              Pending Orders: {orderStatistics.pendingOrders}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1">
              Completed Orders: {orderStatistics.completedOrders}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1">
              Total Revenue: ${orderStatistics.totalRevenue.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as OrderStatus
                      )
                    }
                  >
                    {Object.values(OrderStatus).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">Edit Order</Typography>
          {editingOrder && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={editingOrder.status}
                onChange={(e) =>
                  setEditingOrder({
                    ...editingOrder,
                    status: e.target.value as OrderStatus,
                  })
                }
              >
                {Object.values(OrderStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button onClick={handleEditSubmit}>Save Changes</Button>
        </Box>
      </Modal>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography>Are you sure you want to delete this order?</Typography>
          <Button onClick={handleDeleteConfirm}>Yes, Delete</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CateringOrdersAdmin;
