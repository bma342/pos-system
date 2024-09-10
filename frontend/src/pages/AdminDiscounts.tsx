import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchDiscounts } from '../redux/slices/discountSlice';
import { discountApi } from '../api/discountApi';
import { Discount, DiscountCreateData, DiscountFilterOptions } from '../types/discountTypes';
import { useAuth } from '../hooks/useAuth';
import { 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid, 
  Paper, 
  Box,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AdminDiscounts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const discounts = useSelector((state: RootState) => state.discount.discounts);
  const { user } = useAuth();
  const [newDiscount, setNewDiscount] = useState<DiscountCreateData>({
    name: '',
    description: '',
    discountType: 'fixed',
    type: 'fixed',
    value: 0,
    expirationDate: new Date().toISOString(),
    conditions: {},
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    isActive: true,
    clientId: user?.clientId || '',
    locationId: '',
  });
  const [filterOptions, setFilterOptions] = useState<DiscountFilterOptions>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDropScheduleDialogOpen, setIsDropScheduleDialogOpen] = useState(false);
  const [dropScheduleDate, setDropScheduleDate] = useState<Date | null>(null);
  const [selectedDiscountForDrop, setSelectedDiscountForDrop] = useState<string | null>(null);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchDiscounts(user.clientId));
    }
  }, [dispatch, user]);

  const handleCreateDiscount = async () => {
    try {
      await discountApi.createDiscount(user?.clientId || '', newDiscount);
      if (user?.clientId) {
        dispatch(fetchDiscounts(user.clientId));
      }
      setSnackbar({ open: true, message: 'Discount created successfully', severity: 'success' });
      resetDiscountForm();
    } catch (error) {
      console.error('Error creating discount:', error);
      setSnackbar({ open: true, message: 'Error creating discount', severity: 'error' });
    }
  };

  const handleUpdateDiscount = async () => {
    if (!editingDiscount) return;
    try {
      await discountApi.updateDiscount(user?.clientId || '', editingDiscount.id, editingDiscount);
      if (user?.clientId) {
        dispatch(fetchDiscounts(user.clientId));
      }
      setSnackbar({ open: true, message: 'Discount updated successfully', severity: 'success' });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating discount:', error);
      setSnackbar({ open: true, message: 'Error updating discount', severity: 'error' });
    }
  };

  const handleDeleteDiscount = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      try {
        await discountApi.deleteDiscount(user?.clientId || '', id);
        if (user?.clientId) {
          dispatch(fetchDiscounts(user.clientId));
        }
        setSnackbar({ open: true, message: 'Discount deleted successfully', severity: 'success' });
      } catch (error) {
        console.error('Error deleting discount:', error);
        setSnackbar({ open: true, message: 'Error deleting discount', severity: 'error' });
      }
    }
  };

  const handleScheduleDiscountDrop = async () => {
    if (!selectedDiscountForDrop || !dropScheduleDate) return;
    try {
      await discountApi.scheduleDiscountDrop(user?.clientId || '', selectedDiscountForDrop, dropScheduleDate.toISOString());
      setSnackbar({ open: true, message: 'Discount drop scheduled successfully', severity: 'success' });
      setIsDropScheduleDialogOpen(false);
      setSelectedDiscountForDrop(null);
      setDropScheduleDate(null);
    } catch (error) {
      console.error('Error scheduling discount drop:', error);
      setSnackbar({ open: true, message: 'Error scheduling discount drop', severity: 'error' });
    }
  };

  const resetDiscountForm = () => {
    setNewDiscount({
      name: '',
      description: '',
      discountType: 'fixed',
      type: 'fixed',
      value: 0,
      expirationDate: new Date().toISOString(),
      conditions: {},
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      isActive: true,
      clientId: user?.clientId || '',
      locationId: '',
    });
  };

  const handleFilterChange = (key: keyof DiscountFilterOptions, value: any) => {
    setFilterOptions(prev => ({ ...prev, [key]: value }));
  };

  const filteredDiscounts = discounts.filter(discount => {
    if (filterOptions.isActive !== undefined && discount.isActive !== filterOptions.isActive) return false;
    if (filterOptions.discountType && discount.discountType !== filterOptions.discountType) return false;
    if (filterOptions.startDate && new Date(discount.startDate) < new Date(filterOptions.startDate)) return false;
    if (filterOptions.endDate && new Date(discount.endDate) > new Date(filterOptions.endDate)) return false;
    return true;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Discount Management</Typography>
        
        {/* Discount creation form */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Create New Discount</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={newDiscount.name}
                onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                value={newDiscount.description}
                onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={newDiscount.discountType}
                  onChange={(e) => setNewDiscount({ ...newDiscount, discountType: e.target.value as 'percentage' | 'fixed' | 'bogo' })}
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                  <MenuItem value="bogo">Buy One Get One</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Value"
                value={newDiscount.value}
                onChange={(e) => setNewDiscount({ ...newDiscount, value: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={new Date(newDiscount.startDate)}
                onChange={(date) => setNewDiscount({ ...newDiscount, startDate: date ? date.toISOString() : new Date().toISOString() })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={new Date(newDiscount.endDate)}
                onChange={(date) => setNewDiscount({ ...newDiscount, endDate: date ? date.toISOString() : new Date().toISOString() })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newDiscount.isActive}
                    onChange={(e) => setNewDiscount({ ...newDiscount, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleCreateDiscount} sx={{ mt: 2 }}>
            Create Discount
          </Button>
        </Paper>

        {/* Filter component */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Filter Discounts</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={filterOptions.discountType || ''}
                  onChange={(e) => handleFilterChange('discountType', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                  <MenuItem value="bogo">Buy One Get One</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.isActive || false}
                    onChange={(e) => handleFilterChange('isActive', e.target.checked)}
                  />
                }
                label="Active Only"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={filterOptions.startDate ? new Date(filterOptions.startDate) : null}
                onChange={(date) => handleFilterChange('startDate', date ? date.toISOString() : null)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={filterOptions.endDate ? new Date(filterOptions.endDate) : null}
                onChange={(date) => handleFilterChange('endDate', date ? date.toISOString() : null)}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Discount list */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Existing Discounts</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>{discount.discountType}</TableCell>
                    <TableCell>{discount.value}</TableCell>
                    <TableCell>{new Date(discount.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(discount.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{discount.isActive ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button onClick={() => { setEditingDiscount(discount); setIsEditDialogOpen(true); }}>Edit</Button>
                      <Button onClick={() => handleDeleteDiscount(discount.id)}>Delete</Button>
                      <Button onClick={() => { setSelectedDiscountForDrop(discount.id); setIsDropScheduleDialogOpen(true); }}>Schedule Drop</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Edit Discount Dialog */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Discount</DialogTitle>
          <DialogContent>
            {editingDiscount && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={editingDiscount.name}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, name: e.target.value })}
                  />
                </Grid>
                {/* Add other fields similar to the create form */}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateDiscount} color="primary">Update</Button>
          </DialogActions>
        </Dialog>

        {/* Schedule Drop Dialog */}
        <Dialog open={isDropScheduleDialogOpen} onClose={() => setIsDropScheduleDialogOpen(false)}>
          <DialogTitle>Schedule Discount Drop</DialogTitle>
          <DialogContent>
            <DatePicker
              label="Drop Date"
              value={dropScheduleDate}
              onChange={(date) => setDropScheduleDate(date)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDropScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleScheduleDiscountDrop} color="primary">Schedule</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default AdminDiscounts;
