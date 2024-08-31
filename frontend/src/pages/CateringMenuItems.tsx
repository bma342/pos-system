import React, { useState, useCallback } from 'react';
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
  InputLabel,
  FormControl,
} from '@mui/material';

interface CateringMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  menuId: number;
}

interface CateringMenu {
  id: number;
  name: string;
}

const API_URL = process.env.REACT_APP_API_URL || '/api';

const CateringMenuItems: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    menuId: 0,
  });

  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery<CateringMenuItem[]>('cateringMenuItems', async () => {
    const response = await axios.get(`${API_URL}/catering-menu-items`);
    return response.data;
  });

  const { data: menus } = useQuery<CateringMenu[]>(
    'cateringMenus',
    async () => {
      const response = await axios.get(`${API_URL}/catering-menus`);
      return response.data;
    }
  );

  const createItemMutation = useMutation(
    (newItem: Omit<CateringMenuItem, 'id'>) =>
      axios.post(`${API_URL}/catering-menu-items`, newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cateringMenuItems');
        setOpen(false);
        setNewItem({ name: '', description: '', price: 0, menuId: 0 });
      },
    }
  );

  const handleCreateItem = useCallback(() => {
    createItemMutation.mutate(newItem);
  }, [createItemMutation, newItem]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewItem((prev) => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) : value,
      }));
    },
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading menu items</div>;

  return (
    <div>
      <h1>Catering Menu Items</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Menu Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Menu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  {menus?.find((menu) => menu.id === item.menuId)?.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newItem.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={newItem.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={newItem.price}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Menu</InputLabel>
            <Select
              value={newItem.menuId}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  menuId: e.target.value as number,
                }))
              }
            >
              {menus?.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                  {menu.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateItem}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CateringMenuItems;
