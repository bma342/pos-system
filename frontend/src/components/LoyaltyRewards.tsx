import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchLoyaltyRewards,
  createLoyaltyReward,
  updateLoyaltyReward,
  deleteLoyaltyReward,
} from '../redux/slices/loyaltySlice';
import { LoyaltyReward } from '../types';
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const LoyaltyRewards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rewards, status, error } = useSelector(
    (state: RootState) => state.loyalty
  );
  const [newReward, setNewReward] = useState<Partial<LoyaltyReward>>({
    name: '',
    pointsRequired: 0,
    isActive: true,
  });

  useEffect(() => {
    dispatch(fetchLoyaltyRewards());
  }, [dispatch]);

  const handleCreateReward = () => {
    if (newReward.name && newReward.pointsRequired) {
      dispatch(createLoyaltyReward(newReward));
      setNewReward({ name: '', pointsRequired: 0, isActive: true });
    }
  };

  const handleUpdateReward = (reward: LoyaltyReward) => {
    dispatch(updateLoyaltyReward(reward));
  };

  const handleDeleteReward = (id: number) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      dispatch(deleteLoyaltyReward(id));
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Loyalty Rewards
      </Typography>
      <TextField
        label="Reward Name"
        value={newReward.name}
        onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
      />
      <TextField
        label="Points Required"
        type="number"
        value={newReward.pointsRequired}
        onChange={(e) =>
          setNewReward({
            ...newReward,
            pointsRequired: parseInt(e.target.value),
          })
        }
      />
      <Button onClick={handleCreateReward}>Add Reward</Button>

      <List>
        {rewards.map((reward) => (
          <ListItem key={reward.id}>
            <TextField
              value={reward.name}
              onChange={(e) =>
                handleUpdateReward({ ...reward, name: e.target.value })
              }
            />
            <TextField
              type="number"
              value={reward.pointsRequired}
              onChange={(e) =>
                handleUpdateReward({
                  ...reward,
                  pointsRequired: parseInt(e.target.value),
                })
              }
            />
            <Button
              onClick={() =>
                handleUpdateReward({ ...reward, isActive: !reward.isActive })
              }
            >
              {reward.isActive ? 'Deactivate' : 'Activate'}
            </Button>
            <IconButton onClick={() => handleDeleteReward(reward.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LoyaltyRewards;
