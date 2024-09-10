import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServiceFees,
  updateServiceFee,
  deleteServiceFee,
} from '../redux/slices/serviceFeeSlice';
import { AppDispatch, RootState } from '../redux/store';
import { ServiceFee } from '../types/serviceFeeTypes';
import { useAuth } from '../hooks/useAuth';
import { Box, Typography, List, ListItem, Button, TextField, Select, MenuItem, Grid } from '@mui/material';

const ServiceFeeManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const serviceFees = useSelector((state: RootState) => state.serviceFee.serviceFees);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchServiceFees(user.clientId));
    }
  }, [dispatch, user]);

  const handleUpdate = (fee: ServiceFee) => {
    if (user?.clientId) {
      dispatch(updateServiceFee({ clientId: user.clientId, serviceFee: fee }));
    }
  };

  const handleDelete = (feeId: string) => {
    if (user?.clientId) {
      dispatch(deleteServiceFee({ clientId: user.clientId, serviceFeeId: feeId }));
    }
  };

  return (
    <Box sx={{ maxWidth: 'var(--max-width-lg)', margin: '0 auto', padding: 'var(--spacing-md)' }}>
      <Typography variant="h4" component="h1" gutterBottom>Service Fee Manager</Typography>
      <List aria-label="List of service fees">
        {serviceFees.map((fee) => (
          <ListItem key={fee.id} sx={{ mb: 2, border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  value={fee.name}
                  onChange={(e) => handleUpdate({ ...fee, name: e.target.value })}
                  label="Name"
                  fullWidth
                  aria-label={`Edit name for ${fee.name}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={fee.amount}
                  onChange={(e) => handleUpdate({ ...fee, amount: parseFloat(e.target.value) })}
                  label="Amount"
                  type="number"
                  fullWidth
                  aria-label={`Edit amount for ${fee.name}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Select
                  value={fee.type}
                  onChange={(e) => handleUpdate({ ...fee, type: e.target.value as 'fixed' | 'percentage' })}
                  label="Type"
                  fullWidth
                  aria-label={`Select type for ${fee.name}`}
                >
                  <MenuItem value="fixed">Fixed</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button onClick={() => handleDelete(fee.id)} variant="outlined" color="secondary" fullWidth aria-label={`Delete ${fee.name}`}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ServiceFeeManager;
