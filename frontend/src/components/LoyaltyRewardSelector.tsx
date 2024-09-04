import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchLoyaltyConfig,
  fetchLoyaltyRewards,
  selectLoyaltyRewards,
  selectLoyaltyStatus,
} from '../redux/slices/loyaltySlice';
import { AppDispatch, RootState } from '../types';
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const LoyaltyRewardSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId } = useParams<{ clientId: string }>();

  const loyaltyRewards = useSelector((state: RootState) =>
    selectLoyaltyRewards(state)
  );
  const status = useSelector((state: RootState) => selectLoyaltyStatus(state));

  useEffect(() => {
    if (status === 'idle' && clientId) {
      dispatch(fetchLoyaltyConfig(Number(clientId)));
      dispatch(fetchLoyaltyRewards(Number(clientId)));
    }
  }, [status, clientId, dispatch]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">Failed to load loyalty rewards. Please try again later.</Typography>;
  }

  return (
    <div>
      <Typography variant="h2">Select Loyalty Reward</Typography>
      <List>
        {loyaltyRewards.map((reward) => (
          <ListItem key={reward.id}>
            <ListItemText 
              primary={reward.name} 
              secondary={`${reward.pointsRequired} points`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LoyaltyRewardSelector;
