import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLoyaltyRewards, createLoyaltyReward, updateLoyaltyReward, deleteLoyaltyReward, fetchLoyaltyConfig, updateLoyaltyConfig } from '../redux/slices/loyaltySlice';
import { LoyaltyReward, LoyaltyConfig } from '../types/loyaltyTypes';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useSelectedClient } from '../hooks/useSelectedClient';
import { Typography, TextField, Button, Checkbox, FormGroup, FormControlLabel, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const LoyaltyManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const selectedClient = useSelectedClient();
  const { rewards, config, status, error } = useSelector(
    (state: RootState) => state.loyalty
  );
  const [newReward, setNewReward] = useState<Partial<LoyaltyReward>>({
    name: '',
    description: '',
    rewardType: '',
    pointsRequired: 0,
    isActive: true,
    availableDays: [],
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });
  const [editingConfig, setEditingConfig] = useState<LoyaltyConfig | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (selectedClient && selectedLocation) {
      dispatch(fetchLoyaltyRewards({ 
        clientId: selectedClient.id.toString(), 
        locationId: selectedLocation.id.toString() 
      }));
      dispatch(fetchLoyaltyConfig());
    }
  }, [dispatch, selectedClient, selectedLocation]);

  const validateReward = (reward: Partial<LoyaltyReward>): boolean => {
    if (!reward.name || reward.name.trim() === '') {
      setFormError('Reward name is required');
      return false;
    }
    if (reward.pointsRequired === undefined || reward.pointsRequired < 0) {
      setFormError('Points required must be a positive number');
      return false;
    }
    if (!reward.rewardType || reward.rewardType.trim() === '') {
      setFormError('Reward type is required');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleCreateReward = () => {
    if (validateReward(newReward) && selectedClient && selectedLocation) {
      dispatch(createLoyaltyReward({
        clientId: selectedClient.id.toString(),
        locationId: selectedLocation.id.toString(),
        reward: newReward as LoyaltyReward
      }));
      setNewReward({
        name: '',
        description: '',
        rewardType: '',
        pointsRequired: 0,
        isActive: true,
        availableDays: [],
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      });
    }
  };

  const handleUpdateReward = (reward: LoyaltyReward) => {
    if (validateReward(reward)) {
      dispatch(updateLoyaltyReward(reward));
    }
  };

  const handleDeleteReward = (rewardId: string) => {
    dispatch(deleteLoyaltyReward(rewardId));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="loyalty-management" sx={{ p: isMobile ? 1 : 2 }}>
        <Typography variant="h4" gutterBottom>
          Loyalty Management
        </Typography>

        {/* Reward creation form */}
        <Box className="loyalty-rewards" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Create New Loyalty Reward
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateReward(); }} className="reward-form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reward Name"
                  value={newReward.name}
                  onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                  required
                  aria-label="Reward Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reward Type"
                  value={newReward.rewardType}
                  onChange={(e) => setNewReward({ ...newReward, rewardType: e.target.value })}
                  required
                  aria-label="Reward Type"
                />
              </Grid>
              {/* Add more form fields here */}
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Create Reward
            </Button>
          </form>
          {formError && <Typography color="error" role="alert">{formError}</Typography>}
        </Box>

        {/* List of existing rewards */}
        <Box className="rewards-list" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Existing Rewards
          </Typography>
          {rewards.map((reward) => (
            <Box key={reward.id} className="reward-item" sx={{ mb: 2 }}>
              <Typography>{reward.name} - {reward.rewardType}</Typography>
              <Button onClick={() => handleUpdateReward(reward)} aria-label={`Edit ${reward.name}`}>Edit</Button>
              <Button onClick={() => handleDeleteReward(reward.id)} aria-label={`Delete ${reward.name}`}>Delete</Button>
            </Box>
          ))}
        </Box>

        {/* Loyalty configuration section */}
        {/* ... (keep existing loyalty configuration UI) */}
      </Box>
    </LocalizationProvider>
  );
};

export default LoyaltyManagement;
