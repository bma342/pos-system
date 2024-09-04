import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceFees, createServiceFee } from '../redux/slices/serviceFeeSlice';
import { ServiceFee } from '../types/serviceFeeTypes';
import { AppDispatch, RootState } from '../redux/store';

const ServiceFeeBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { serviceFees, loading, error } = useSelector((state: RootState) => state.serviceFee);
  const [newFee, setNewFee] = useState<Omit<ServiceFee, 'id'>>({
    name: '',
    amount: 0,
    type: 'FIXED',
    clientId: '',
  });

  useEffect(() => {
    dispatch(fetchServiceFees());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setNewFee((prev) => ({
      ...prev,
      [name as string]: name === 'amount' ? parseFloat(value as string) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createServiceFee(newFee));
      setNewFee({ name: '', amount: 0, type: 'FIXED', clientId: '' });
    } catch (error) {
      console.error('Failed to create service fee:', error);
    }
  };

  if (loading) {
    return <Typography>Loading service fees...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Service Fee Builder
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Fee Name"
            value={newFee.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="amount"
            label="Fee Amount"
            type="number"
            value={newFee.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="fee-type-label">Fee Type</InputLabel>
            <Select
              labelId="fee-type-label"
              name="type"
              value={newFee.type}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="FIXED">Fixed</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="clientId"
            label="Client ID"
            value={newFee.clientId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Service Fee
          </Button>
        </form>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Existing Service Fees
        </Typography>
        {serviceFees.map((fee) => (
          <Box key={fee.id} sx={{ mb: 2 }}>
            <Typography>
              {fee.name}: {fee.amount} ({fee.type}) - Client ID: {fee.clientId}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ServiceFeeBuilder;
