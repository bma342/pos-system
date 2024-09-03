import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchChallenges,
  createChallenge,
  updateChallenge,
  Challenge,
  ChallengeType
} from '../redux/slices/challengeSlice';

const ChallengeManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const challenges = useSelector((state: RootState) => state.challenge.challenges);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({
    name: '',
    description: '',
    challengeType: 'purchase' as ChallengeType,
    targetValue: 0,
    reward: 0,
  });

  useEffect(() => {
    dispatch(fetchChallenges());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(createChallenge(newChallenge as Challenge));
    setNewChallenge({
      name: '',
      description: '',
      challengeType: 'purchase' as ChallengeType,
      targetValue: 0,
      reward: 0,
    });
  };

  const handleUpdate = (updatedChallenge: Challenge) => {
    dispatch(updateChallenge(updatedChallenge));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewChallenge(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<ChallengeType>) => {
    setNewChallenge(prev => ({ ...prev, challengeType: event.target.value as ChallengeType }));
  };

  return (
    <div>
      <Typography variant="h4">Challenge Manager</Typography>
      <div>
        <TextField
          name="name"
          label="Challenge Name"
          value={newChallenge.name}
          onChange={handleInputChange}
        />
        <TextField
          name="description"
          label="Description"
          value={newChallenge.description}
          onChange={handleInputChange}
        />
        <Select
          value={newChallenge.challengeType}
          onChange={handleSelectChange}
          label="Challenge Type"
        >
          <MenuItem value="purchase">Purchase</MenuItem>
          <MenuItem value="visit">Visit</MenuItem>
          <MenuItem value="referral">Referral</MenuItem>
        </Select>
        <TextField
          name="targetValue"
          label="Target Value"
          type="number"
          value={newChallenge.targetValue}
          onChange={handleInputChange}
        />
        <TextField
          name="reward"
          label="Reward"
          type="number"
          value={newChallenge.reward}
          onChange={handleInputChange}
        />
        <Button onClick={handleCreate}>Create Challenge</Button>
      </div>
      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            <Typography>{challenge.name}</Typography>
            <Typography>{challenge.description}</Typography>
            <Typography>Type: {challenge.challengeType}</Typography>
            <Typography>Target: {challenge.targetValue}</Typography>
            <Typography>Reward: {challenge.reward}</Typography>
            <Button onClick={() => handleUpdate({ ...challenge, status: 'active' })}>
              Activate
            </Button>
            <Button onClick={() => handleUpdate({ ...challenge, status: 'inactive' })}>
              Deactivate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeManager;
