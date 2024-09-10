import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchServiceFees, createServiceFee } from '../redux/slices/serviceFeeSlice';
import { ServiceFeeCreateData } from '../types/serviceFeeTypes';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, List, ListItem, Grid, SelectChangeEvent } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const ServiceFeeBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const serviceFees = useSelector((state: RootState) => state.serviceFee.serviceFees);
  const [newFee, setNewFee] = useState<ServiceFeeCreateData>({
    name: '',
    amount: 0,
    type: 'fixed',
    clientId: user?.clientId || '',
  });

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchServiceFees(user.clientId));
    }
  }, [dispatch, user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewFee(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<'fixed' | 'percentage'>) => {
    setNewFee(prev => ({ ...prev, type: event.target.value as 'fixed' | 'percentage' }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user?.clientId) {
      try {
        await dispatch(createServiceFee({ clientId: user.clientId, serviceFee: newFee })).unwrap();
        setNewFee({ name: '', amount: 0, type: 'fixed', clientId: user.clientId });
      } catch (error) {
        console.error('Failed to create service fee:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 'var(--max-width-md)', margin: '0 auto', padding: 'var(--spacing-md)' }}>
      <Typography variant="h4" component="h1" gutterBottom>Create Service Fee</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Fee Name"
              value={newFee.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              aria-label="Enter fee name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={newFee.amount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              aria-label="Enter fee amount"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="fee-type-label">Fee Type</InputLabel>
              <Select
                labelId="fee-type-label"
                name="type"
                value={newFee.type}
                onChange={handleSelectChange}
                required
                aria-label="Select fee type"
              >
                <MenuItem value="fixed">Fixed</MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" aria-label="Add service fee">
              Add Service Fee
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>Existing Service Fees</Typography>
      <List aria-label="List of existing service fees">
        {serviceFees.map((fee) => (
          <ListItem key={fee.id}>
            <Typography>{fee.name}: {fee.amount} ({fee.type})</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ServiceFeeBuilder;
