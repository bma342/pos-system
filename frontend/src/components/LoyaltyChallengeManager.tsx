import React, { useState, useEffect } from 'react';
import {
  fetchLoyaltyChallenges,
  createLoyaltyChallenge,
  updateLoyaltyChallenge,
  deleteLoyaltyChallenge,
} from '../api/loyaltyChallengeApi';
import { LoyaltyChallenge, MenuItem, MenuGroup } from '../types';
import { getMenuItems, getMenuGroups } from '../api/menuApi';
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const LoyaltyChallengeManager: React.FC = () => {
  const [challenges, setChallenges] = useState<LoyaltyChallenge[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([]);
  const [newChallenge, setNewChallenge] = useState<Omit<LoyaltyChallenge, 'id'>>({
    name: '',
    description: '',
    conditions: {
      itemCount: 0,
      timeframe: '',
      minSpend: 0,
      frequency: 'unlimited',
      restrictedMenuItems: [],
      restrictedMenuGroups: [],
    },
    rewardConfig: {
      reward: '',
      points: 0,
      discount: 0,
    },
    challengeType: 'purchase-based',
    startDate: new Date(),
    endDate: new Date(),
    status: 'active',
    participantCount: 0,
    locationId: 0,
    clientId: 0,
  });

  useEffect(() => {
    fetchChallenges();
    fetchMenuItems();
    fetchMenuGroups();
  }, []);

  const fetchChallenges = async () => {
    try {
      const fetchedChallenges = await fetchLoyaltyChallenges();
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.error('Error fetching loyalty challenges:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchMenuGroups = async () => {
    try {
      const groups = await getMenuGroups();
      setMenuGroups(groups);
    } catch (error) {
      console.error('Error fetching menu groups:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLoyaltyChallenge(newChallenge);
      setNewChallenge({
        name: '',
        description: '',
        conditions: {
          itemCount: 0,
          timeframe: '',
          minSpend: 0,
          frequency: 'unlimited',
          restrictedMenuItems: [],
          restrictedMenuGroups: [],
        },
        rewardConfig: {
          reward: '',
          points: 0,
          discount: 0,
        },
        challengeType: 'purchase-based',
        startDate: new Date(),
        endDate: new Date(),
        status: 'active',
        participantCount: 0,
        locationId: 0,
        clientId: 0,
      });
      fetchChallenges();
    } catch (error) {
      console.error('Error creating loyalty challenge:', error);
    }
  };

  const handleUpdate = async (
    id: number,
    updatedChallenge: Partial<LoyaltyChallenge>
  ) => {
    try {
      await updateLoyaltyChallenge(id, updatedChallenge);
      fetchChallenges();
    } catch (error) {
      console.error('Error updating loyalty challenge:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLoyaltyChallenge(id);
      fetchChallenges();
    } catch (error) {
      console.error('Error deleting loyalty challenge:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h2">Loyalty Challenge Manager</Typography>
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Challenge Name"
              value={newChallenge.name}
              onChange={(e) =>
                setNewChallenge({ ...newChallenge, name: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              value={newChallenge.description}
              onChange={(e) =>
                setNewChallenge({ ...newChallenge, description: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Challenge Type</InputLabel>
              <Select
                value={newChallenge.challengeType}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, challengeType: e.target.value as 'purchase-based' | 'engagement-based' })
                }
                required
              >
                <MuiMenuItem value="purchase-based">Purchase-based</MuiMenuItem>
                <MuiMenuItem value="engagement-based">Engagement-based</MuiMenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Add more form fields for other properties */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Loyalty Challenge
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box mt={4}>
        <Typography variant="h3">Existing Challenges</Typography>
        {challenges.map((challenge) => (
          <Paper key={challenge.id} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h4">{challenge.name}</Typography>
            <Typography>Type: {challenge.challengeType}</Typography>
            <Typography>Status: {challenge.status}</Typography>
            <Typography>
              Conditions: Item Count: {challenge.conditions.itemCount},
              Timeframe: {challenge.conditions.timeframe}, Min Spend: $
              {challenge.conditions.minSpend}, Frequency:{' '}
              {challenge.conditions.frequency.replace(/_/g, ' ')}
            </Typography>
            <Typography>Reward: {JSON.stringify(challenge.rewardConfig)}</Typography>
            <Typography>Start Date: {challenge.startDate.toLocaleDateString()}</Typography>
            <Typography>End Date: {challenge.endDate.toLocaleDateString()}</Typography>
            <Typography>Participants: {challenge.participantCount}</Typography>
            <Typography>
              Restricted Menu Items:{' '}
              {challenge.conditions.restrictedMenuItems?.join(', ') || 'None'}
            </Typography>
            <Typography>
              Restricted Menu Groups:{' '}
              {challenge.conditions.restrictedMenuGroups?.join(', ') || 'None'}
            </Typography>
            <Button onClick={() => handleDelete(challenge.id)} color="secondary">
              Delete
            </Button>
            <Button
              onClick={() =>
                handleUpdate(challenge.id, {
                  status: challenge.status === 'active' ? 'inactive' : 'active',
                })
              }
              color="primary"
            >
              {challenge.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default LoyaltyChallengeManager;
