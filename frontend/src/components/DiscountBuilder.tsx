import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DiscountService } from '../services/DiscountService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const DiscountBuilder: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const locationId = useSelector(
    (state: RootState) => state.location.currentLocation?.id
  );
  const discountService = new DiscountService();

  useEffect(() => {
    // You can use locationId here if needed, e.g., to fetch location-specific data
    console.log('Current location ID:', locationId);
  }, [locationId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (locationId) {
        await discountService.createDiscount({
          name,
          type,
          value: parseFloat(value),
          code,
          locationId,
        });
        // Reset form or show success message
        console.log('Discount created successfully');
      } else {
        console.error('No location selected');
      }
    } catch (error) {
      console.error('Failed to create discount:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Discount Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
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
      />
      <TextField
        label="Discount Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Create Discount
      </Button>
    </form>
  );
};

export default DiscountBuilder;
