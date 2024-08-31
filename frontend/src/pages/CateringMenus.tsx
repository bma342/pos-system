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
} from '@mui/material';

interface CateringMenu {
  id: number;
  name: string;
  description: string;
}

const API_URL = process.env.REACT_APP_API_URL || '/api';

const CateringMenus: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newMenu, setNewMenu] = useState({ name: '', description: '' });

  const {
    data: menus,
    isLoading,
    isError,
  } = useQuery<CateringMenu[]>('cateringMenus', async () => {
    const response = await axios.get(`${API_URL}/catering-menus`);
    return response.data;
  });

  const createMenuMutation = useMutation(
    (newMenu: Omit<CateringMenu, 'id'>) =>
      axios.post(`${API_URL}/catering-menus`, newMenu),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cateringMenus');
        setOpen(false);
        setNewMenu({ name: '', description: '' });
      },
    }
  );

  const handleCreateMenu = useCallback(() => {
    createMenuMutation.mutate(newMenu);
  }, [createMenuMutation, newMenu]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewMenu((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading menus</div>;

  return (
    <div>
      <h1>Catering Menus</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Menu
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menus?.map((menu) => (
              <TableRow key={menu.id}>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{menu.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Catering Menu</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newMenu.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={newMenu.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateMenu}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CateringMenus;
