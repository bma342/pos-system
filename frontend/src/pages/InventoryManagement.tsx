import React, { useEffect, useState } from 'react';
import {
  Typography,
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
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { InventoryItem } from '../types/inventoryTypes';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useSelectedClient } from '../hooks/useSelectedClient';
import * as inventoryApi from '../api/inventoryApi';

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Partial<InventoryItem> | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const { selectedLocation } = useSelectedLocation();
  const selectedClient = useSelectedClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchInventory = async () => {
      if (selectedClient && selectedLocation) {
        try {
          const data = await inventoryApi.getInventory(selectedClient.id.toString(), selectedLocation.id);
          setInventory(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching inventory:', error);
          setError('Failed to fetch inventory. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchInventory();
  }, [selectedLocation, selectedClient]);

  const handleAddItem = () => {
    setSelectedItem({ name: '', quantity: 0, unit: '', reorderPoint: 0 });
    setIsModalOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = async () => {
    if (!selectedItem || !selectedClient || !selectedLocation) return;

    try {
      let updatedItem: InventoryItem;
      if (!selectedItem.id) {
        updatedItem = await inventoryApi.createInventoryItem(
          selectedClient.id.toString(),
          selectedLocation.id,
          selectedItem as Omit<InventoryItem, 'id'>
        );
        setInventory([...inventory, updatedItem]);
      } else {
        updatedItem = await inventoryApi.updateInventoryItem(
          selectedClient.id.toString(),
          selectedLocation.id,
          selectedItem as InventoryItem
        );
        setInventory(
          inventory.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
      }
      setIsModalOpen(false);
      setSnackbar({
        message: 'Inventory item saved successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        message: 'Failed to save inventory item. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!selectedClient || !selectedLocation) return;
    try {
      await inventoryApi.deleteInventoryItem(selectedClient.id.toString(), selectedLocation.id, itemId);
      setInventory(inventory.filter((item) => item.id !== itemId));
      setSnackbar({
        message: 'Inventory item deleted successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        message: 'Failed to delete inventory item. Please try again.',
        severity: 'error',
      });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="inventory-management" sx={{ p: isMobile ? 1 : 2 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        style={{ marginBottom: '20px' }}
      >
        Add New Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reorder Point</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditItem(item)}>Edit</Button>
                  <Button
                    onClick={() => handleDeleteItem(item.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Paper
          style={{
            padding: '20px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {selectedItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem();
              }}
            >
              <Typography variant="h6" gutterBottom>
                {selectedItem.id ? 'Edit Item' : 'Add New Item'}
              </Typography>
              <TextField
                label="Name"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                type="number"
                value={selectedItem.quantity}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    quantity: Number(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Unit"
                value={selectedItem.unit}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, unit: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Reorder Point"
                type="number"
                value={selectedItem.reorderPoint}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    reorderPoint: Number(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Save Item
              </Button>
            </form>
          )}
        </Paper>
      </Modal>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(null)}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity}
          sx={{ width: '100%' }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InventoryManagement;
