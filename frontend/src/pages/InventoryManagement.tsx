import React, { useEffect, useState, useMemo } from 'react';
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
} from '@mui/material';
import { InventoryItem } from '../types/inventoryTypes';
import { InventoryService } from '../services/InventoryService';
import { useAuth } from '../contexts/AuthContext';

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inventoryService = useMemo(() => new InventoryService(), []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await inventoryService.getInventory();
        setInventory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Failed to fetch inventory. Please try again.');
        setLoading(false);
      }
    };

    fetchInventory();
  }, [inventoryService]);

  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const handleAddItem = () => {
    setSelectedItem({
      id: 0,
      name: '',
      quantity: 0,
      unit: '',
      reorderPoint: 0,
      tenantId: user.tenantId,
    });
    setIsModalOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = async () => {
    if (!selectedItem) return;

    try {
      let updatedItem;
      if (selectedItem.id === 0) {
        updatedItem = await inventoryService.createInventoryItem(
          user.tenantId,
          selectedItem
        );
        setInventory([...inventory, updatedItem]);
      } else {
        updatedItem = await inventoryService.updateInventoryItem(
          user.tenantId,
          selectedItem.id,
          selectedItem
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

  const handleDeleteItem = async (itemId: number) => {
    if (
      window.confirm('Are you sure you want to delete this inventory item?')
    ) {
      try {
        await inventoryService.deleteInventoryItem(user.tenantId, itemId);
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
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
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
                {selectedItem.id === 0 ? 'Add New Item' : 'Edit Item'}
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
    </div>
  );
};

export default InventoryManagement;
