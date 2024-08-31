import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { WalletDropService } from '../services/WalletDropService';
import { WalletDrop as WalletDropType } from '../types/walletTypes';

const WalletDrop: React.FC = () => {
  const [walletDrop, setWalletDrop] = useState<WalletDropType>({
    amount: 0,
    expirationDate: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const walletDropService = new WalletDropService();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWalletDrop((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await walletDropService.createWalletDrop(walletDrop);
      setSuccess('Wallet drop created successfully');
      setWalletDrop({ amount: 0, expirationDate: '', description: '' });
    } catch (err) {
      setError('Failed to create wallet drop');
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create Wallet Drop
      </Typography>
      <TextField
        name="amount"
        label="Amount"
        type="number"
        value={walletDrop.amount}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="expirationDate"
        label="Expiration Date"
        type="date"
        value={walletDrop.expirationDate}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="description"
        label="Description"
        value={walletDrop.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Wallet Drop
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
    </Box>
  );
};

export default WalletDrop;
