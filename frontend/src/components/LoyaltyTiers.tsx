import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchLoyaltyConfig,
  updateLoyaltyConfig,
} from '../redux/slices/loyaltySlice';
import { LoyaltyConfig } from '../types';
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      setEditingConfig({
        ...editingConfig,
        tiers: [...editingConfig.tiers, { tierName: '' }],
      });
    }
  };

  const handleRemoveTier = (index: number) => {
    if (editingConfig) {
      const newTiers = editingConfig.tiers.filter((_, i) => i !== index);
      setEditingConfig({ ...editingConfig, tiers: newTiers });
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Loyalty Tiers
      </Typography>
      {editingConfig && (
        <>
          <List>
            {editingConfig.tiers.map((tier, index) => (
              <ListItem key={index}>
                <TextField
                  value={tier.tierName}
                  onChange={(e) => {
                    const newTiers = [...editingConfig.tiers];
                    newTiers[index] = { tierName: e.target.value };
                    setEditingConfig({ ...editingConfig, tiers: newTiers });
                  }}
                />
                <IconButton onClick={() => handleRemoveTier(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button onClick={handleAddTier}>Add Tier</Button>
          <Button onClick={handleUpdateConfig}>Save Configuration</Button>
        </>
      )}
    </div>
  );
};

export default LoyaltyTiers;
