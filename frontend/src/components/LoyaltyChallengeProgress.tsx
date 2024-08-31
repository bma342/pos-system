import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';
import { LoyaltyChallenge } from '../types/loyaltyTypes';

interface LoyaltyChallengeProgressProps {
  challenge: LoyaltyChallenge;
  currentProgress: number;
}

const LoyaltyChallengeProgress: React.FC<LoyaltyChallengeProgressProps> = ({
  challenge,
  currentProgress,
}) => {
  const progressPercentage = (currentProgress / challenge.targetValue) * 100;

  return (
    <Box>
      <Typography variant="h6">{challenge.name}</Typography>
      <Typography variant="body2">{challenge.description}</Typography>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={progressPercentage} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(progressPercentage)}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2">
        Progress: {currentProgress} / {challenge.targetValue} {challenge.unit}
      </Typography>
    </Box>
  );
};

export default LoyaltyChallengeProgress;
