import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface CateringOrder {
  id: number;
  customerId: number;
  houseAccountId: number | null;
  orderDate: string;
  deliveryDate: string;
  status: string;
  totalAmount: number;
}

interface Customer {
  id: number;
  name: string;
}

interface HouseAccount {
  id: number;
  name: string;
  balance: number;
}

const API_URL = process.env.REACT_APP_API_URL || '/api';

const CateringOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Partial<CateringOrder>>({
    customerId: 0,
    houseAccountId: null,
    orderDate: new Date().toISOString(),
    deliveryDate: new Date().toISOString(),
    status: 'Pending',
    totalAmount: 0,
  });

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<CateringOrder[]>('cateringOrders', async () => {
    const response = await axios.get(`${API_URL}/catering-orders`);
    return response.data;
  });

  const { data: customers } = useQuery<Customer[]>('customers', async () => {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  });

  const { data: houseAccounts } = useQuery<HouseAccount[]>(
    'houseAccounts',
    async () => {
      const response = await axios.get(`${API_URL}/house-accounts`);
      return response.data;
    }
  );

  const createOrderMutation = useMutation(
    (newOrder: Partial<CateringOrder>) =>
      axios.post(`${API_URL}/catering-orders`, newOrder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cateringOrders');
        setOpen(false);
        setNewOrder({
          customerId: 0,
          houseAccountId: null,
          orderDate: new Date().toISOString(),
          deliveryDate: new Date().toISOString(),
          status: 'Pending',
          totalAmount: 0,
        });
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading catering orders</div>;

  return (
    <div>
      <h1>Catering Orders</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create New Order
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>House Account</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {customers?.find((c) => c.id === order.customerId)?.name}
                </TableCell>
                <TableCell>
                  {order.houseAccountId
                    ? houseAccounts?.find(
                        (ha) => ha.id === order.houseAccountId
                      )?.name
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(order.deliveryDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === 'Completed'
                        ? 'success'
                        : order.status === 'In Progress'
                          ? 'warning'
                          : 'default'
                    }
                  />
                </TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Catering Order</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Customer</InputLabel>
            <Select
              value={newOrder.customerId}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  customerId: e.target.value as number,
                })
              }
            >
              {customers?.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>House Account (Optional)</InputLabel>
            <Select
              value={newOrder.houseAccountId || ''}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  houseAccountId: e.target.value as number | null,
                })
              }
            >
              <MenuItem value="">None</MenuItem>
              {houseAccounts?.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name} (Balance: ${account.balance.toFixed(2)})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DateTimePicker
            label="Order Date"
            value={newOrder.orderDate ? new Date(newOrder.orderDate) : null}
            onChange={(date) =>
              setNewOrder({ ...newOrder, orderDate: date?.toISOString() || '' })
            }
          />
          <DateTimePicker
            label="Delivery Date"
            value={newOrder.deliveryDate ? new Date(newOrder.deliveryDate) : null}
            onChange={(date) =>
              setNewOrder({
                ...newOrder,
                deliveryDate: date?.toISOString() || '',
              })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newOrder.status}
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value as string })
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Total Amount"
            type="number"
            fullWidth
            value={newOrder.totalAmount}
            onChange={(e) =>
              setNewOrder({
                ...newOrder,
                totalAmount: parseFloat(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => createOrderMutation.mutate(newOrder)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CateringOrders;
