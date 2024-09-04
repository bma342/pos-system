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
  Box,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
  const [editingReward, setEditingReward] = useState<LoyaltyReward | null>(null);

  useEffect(() => {
    dispatch(fetchLoyaltyRewards());
  }, [dispatch]);

  const handleCreateReward = () => {
    if (newReward.name && newReward.pointsRequired) {
      dispatch(createLoyaltyReward(newReward as LoyaltyReward));
      setNewReward({ name: '', pointsRequired: 0, isActive: true });
    }
  };

  const handleUpdateReward = (reward: LoyaltyReward) => {
    dispatch(updateLoyaltyReward(reward));
    setEditingReward(null);
  };

  const handleDeleteReward = (id: number) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      dispatch(deleteLoyaltyReward(id));
    }
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Loyalty Rewards
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Reward Name"
              value={newReward.name}
              onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Points Required"
              type="number"
              value={newReward.pointsRequired}
              onChange={(e) =>
                setNewReward({
                  ...newReward,
                  pointsRequired: parseInt(e.target.value, 10),
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" color="primary" onClick={handleCreateReward}>
              Add Reward
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <List>
        {rewards.map((reward) => (
          <ListItem key={reward.id} component={Paper} elevation={2} sx={{ mb: 1, p: 2 }}>
            {editingReward?.id === reward.id ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    value={editingReward.name}
                    onChange={(e) =>
                      setEditingReward({ ...editingReward, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    value={editingReward.pointsRequired}
                    onChange={(e) =>
                      setEditingReward({
                        ...editingReward,
                        pointsRequired: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button onClick={() => handleUpdateReward(editingReward)}>
                    Save
                  </Button>
                  <Button onClick={() => setEditingReward(null)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">{reward.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2">{reward.pointsRequired} points</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    onClick={() =>
                      handleUpdateReward({ ...reward, isActive: !reward.isActive })
                    }
                  >
                    {reward.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <IconButton onClick={() => setEditingReward(reward)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteReward(reward.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LoyaltyRewards;
