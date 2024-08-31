import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { ChallengeService } from '../services/ChallengeService';
import { Challenge } from '../types/challengeTypes';

const ChallengeManager: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({
    name: '',
    description: '',
    type: 'purchase',
    target: 0,
    reward: 0,
  });

  const challengeService = React.useMemo(() => new ChallengeService(), []);

  const fetchChallenges = useCallback(async () => {
    try {
      const fetchedChallenges = await challengeService.getChallenges();
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    }
  }, [challengeService]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const handleCreate = async () => {
    try {
      await challengeService.createChallenge(newChallenge as Challenge);
      fetchChallenges();
      setNewChallenge({
        name: '',
        description: '',
        type: 'purchase',
        target: 0,
        reward: 0,
      });
    } catch (error) {
      console.error('Failed to create challenge:', error);
    }
  };

  const handleUpdate = async (updatedChallenge: Challenge) => {
    try {
      await challengeService.updateChallenge(updatedChallenge);
      fetchChallenges();
    } catch (error) {
      console.error('Failed to update challenge:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Challenge Manager</Typography>
      <div>
        <TextField
          label="Challenge Name"
          value={newChallenge.name}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, name: e.target.value })
          }
        />
        <TextField
          label="Description"
          value={newChallenge.description}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, description: e.target.value })
          }
        />
        <Select
          value={newChallenge.type}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              type: e.target.value as Challenge['type'],
            })
          }
        >
          <MenuItem value="purchase">Purchase</MenuItem>
          <MenuItem value="visit">Visit</MenuItem>
          <MenuItem value="referral">Referral</MenuItem>
        </Select>
        <TextField
          label="Target"
          type="number"
          value={newChallenge.target}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, target: Number(e.target.value) })
          }
        />
        <TextField
          label="Reward"
          type="number"
          value={newChallenge.reward}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, reward: Number(e.target.value) })
          }
        />
        <Button onClick={handleCreate}>Create Challenge</Button>
      </div>
      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            <Typography>{challenge.name}</Typography>
            <Typography>{challenge.description}</Typography>
            <Typography>{challenge.type}</Typography>
            <Typography>Target: {challenge.target}</Typography>
            <Typography>Reward: {challenge.reward}</Typography>
            <Button
              onClick={() => handleUpdate({ ...challenge, status: 'active' })}
            >
              Activate
            </Button>
            <Button
              onClick={() =>
                handleUpdate({ ...challenge, status: 'completed' })
              }
            >
              Complete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeManager;
