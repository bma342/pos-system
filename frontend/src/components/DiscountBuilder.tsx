import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from '@mui/material';
import { DiscountService } from '../services/DiscountService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Discount } from '../types/discountTypes';

const DiscountBuilder: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [maxUses, setMaxUses] = useState('');

  const locationId = useSelector(
    (state: RootState) => state.location.currentLocation?.id
  );
  const discountService = new DiscountService();

  useEffect(() => {
    console.log('Current location ID:', locationId);
  }, [locationId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (locationId) {
        const newDiscount: Omit<Discount, 'id'> = {
          name,
          type,
          value: parseFloat(value),
          code,
          locationId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          minPurchaseAmount: parseFloat(minPurchaseAmount),
          maxUses: parseInt(maxUses, 10),
          isActive: true,
        };
        await discountService.createDiscount(newDiscount);
        console.log('Discount created successfully');
        // Reset form or show success message
      } else {
        console.error('No location selected');
      }
    } catch (error) {
      console.error('Failed to create discount:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Discount
      </Typography>
      <TextField
        label="Discount Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Discount Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as string)}
        >
          <MenuItem value="percentage">Percentage</MenuItem>
          <MenuItem value="fixed">Fixed Amount</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Discount Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      <TextField
        label="Discount Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Minimum Purchase Amount"
        value={minPurchaseAmount}
        onChange={(e) => setMinPurchaseAmount(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Maximum Uses"
        value={maxUses}
        onChange={(e) => setMaxUses(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Create Discount
      </Button>
    </Box>
  );
};

export default DiscountBuilder;
