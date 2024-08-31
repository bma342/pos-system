import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getServiceFees, createServiceFee } from '../api/serviceFeeApi';
import { ServiceFee } from '../types/serviceFeeTypes';

const ServiceFeeBuilder: React.FC = () => {
  const [serviceFees, setServiceFees] = useState<ServiceFee[]>([]);
  const [newFee, setNewFee] = useState<ServiceFee>({ name: '', percentage: 0 });

  useEffect(() => {
    fetchServiceFees();
  }, []);

  const fetchServiceFees = async () => {
    try {
      const fees = await getServiceFees();
      setServiceFees(fees);
    } catch (error) {
      console.error('Failed to fetch service fees:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewFee((prev: ServiceFee) => ({
      ...prev,
      [name]: name === 'percentage' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createServiceFee(newFee);
      setNewFee({ name: '', percentage: 0 });
      fetchServiceFees();
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
          name="percentage"
          label="Fee Percentage"
          type="number"
          value={newFee.percentage}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ min: 0, max: 100, step: 0.01 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Service Fee
        </Button>
      </form>
      <Typography variant="h6" gutterBottom>
        Existing Service Fees
      </Typography>
      <ul>
        {serviceFees.map((fee) => (
          <li key={fee.id}>
            {fee.name}: {fee.percentage}%
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ServiceFeeBuilder;
