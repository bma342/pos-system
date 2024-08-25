import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchLoyaltyConfig,
  fetchLoyaltyRewards,
  selectLoyaltyRewards,
  selectLoyaltyStatus,
} from '../redux/slices/loyaltySlice';
import { AppDispatch, RootState } from '../types'; // Make sure RootState is used

const LoyaltyRewardSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId } = useParams<{ clientId: string }>(); // Fetch the clientId from route params

  // Use RootState for selecting the state from Redux
  const loyaltyRewards = useSelector((state: RootState) =>
    selectLoyaltyRewards(state)
  );
  const status = useSelector((state: RootState) => selectLoyaltyStatus(state));

  useEffect(() => {
    if (status === 'idle' && clientId) {
      dispatch(fetchLoyaltyConfig(Number(clientId))); // Pass clientId when fetching the configuration
      dispatch(fetchLoyaltyRewards(Number(clientId))); // Fetch rewards based on clientId
    }
  }, [status, clientId, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load loyalty rewards. Please try again later.</div>;
  }

  return (
    <div>
      <h2>Select Loyalty Reward</h2>
      <ul>
        {loyaltyRewards.map((reward) => (
          <li key={reward.id}>
            {reward.name} - {reward.pointsRequired} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoyaltyRewardSelector;
