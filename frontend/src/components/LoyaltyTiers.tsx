import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchLoyaltyConfig,
  updateLoyaltyConfig,
} from '../redux/slices/loyaltySlice';
import { LoyaltyConfig, LoyaltyTier } from '../types';
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const LoyaltyTiers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { config, status, error } = useSelector(
    (state: RootState) => state.loyalty
  );
  const [editingConfig, setEditingConfig] = useState<LoyaltyConfig | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchLoyaltyConfig());
  }, [dispatch]);

  useEffect(() => {
    if (config) {
      setEditingConfig(config);
    }
  }, [config]);

  const handleUpdateConfig = () => {
    if (editingConfig) {
      dispatch(updateLoyaltyConfig(editingConfig));
    }
  };

  const handleAddTier = () => {
    if (editingConfig) {
      const newTier: LoyaltyTier = { 
        tierName: '',
        pointThreshold: 0,
        benefits: [],
      };
      setEditingConfig({
        ...editingConfig,
        tiers: [...editingConfig.tiers, newTier],
      });
    }
  };

  const handleRemoveTier = (index: number) => {
    if (editingConfig) {
      const newTiers = editingConfig.tiers.filter((_, i) => i !== index);
      setEditingConfig({ ...editingConfig, tiers: newTiers });
    }
  };

  const handleTierChange = (index: number, field: keyof LoyaltyTier, value: string | number) => {
    if (editingConfig) {
      const newTiers = [...editingConfig.tiers];
      newTiers[index] = { ...newTiers[index], [field]: value };
      setEditingConfig({ ...editingConfig, tiers: newTiers });
    }
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Loyalty Tiers
      </Typography>
      {editingConfig && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {editingConfig.tiers.map((tier, index) => (
              <ListItem key={index} sx={{ mb: 2 }}>
                <TextField
                  label="Tier Name"
                  value={tier.tierName}
                  onChange={(e) => handleTierChange(index, 'tierName', e.target.value)}
                  sx={{ mr: 2 }}
                />
                <TextField
                  label="Point Threshold"
                  type="number"
                  value={tier.pointThreshold}
                  onChange={(e) => handleTierChange(index, 'pointThreshold', parseInt(e.target.value))}
                  sx={{ mr: 2 }}
                />
                <IconButton onClick={() => handleRemoveTier(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button startIcon={<AddIcon />} onClick={handleAddTier} sx={{ mt: 2 }}>
            Add Tier
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdateConfig} sx={{ mt: 2, ml: 2 }}>
            Save Configuration
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default LoyaltyTiers;
