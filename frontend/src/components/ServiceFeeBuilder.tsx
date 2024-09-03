import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceFees, createServiceFee } from '../redux/slices/serviceFeeSlice';
import { ServiceFee } from '../types/serviceFeeTypes';
import { AppDispatch, RootState } from '../redux/store';

const ServiceFeeBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const serviceFees = useSelector((state: RootState) => state.serviceFee.serviceFees);
  const [newFee, setNewFee] = useState<ServiceFee>({ id: '', name: '', amount: 0, type: 'FIXED' });

  useEffect(() => {
    dispatch(fetchServiceFees());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewFee((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createServiceFee(newFee));
      setNewFee({ id: '', name: '', amount: 0, type: 'FIXED' });
    } catch (error) {
      console.error('Failed to create service fee:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
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
            {fee.name}: {fee.amount} ({fee.type})
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ServiceFeeBuilder;
