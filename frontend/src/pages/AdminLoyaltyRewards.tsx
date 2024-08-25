import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchLoyaltyRewards,
  addReward,
  updateReward,
  selectLoyaltyRewards,
} from '../redux/slices/loyaltySlice';
import { AppDispatch, LoyaltyReward } from '../types';

const AdminLoyaltyRewards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId } = useParams<{ clientId: string }>(); // Extract clientId from params
  const loyaltyRewards = useSelector(selectLoyaltyRewards);
  const [rewardName, setRewardName] = useState('');
  const [pointsRequired, setPointsRequired] = useState<number | string>('');

  useEffect(() => {
    if (clientId) {
      dispatch(fetchLoyaltyRewards(Number(clientId))); // Pass clientId as number
    }
  }, [dispatch, clientId]);

  const handleAddReward = () => {
    if (rewardName && pointsRequired) {
      dispatch(
        addReward({
          id: Date.now(),
          name: rewardName,
          pointsRequired: parseInt(pointsRequired as string, 10),
          isActive: true, // Default to active when added
        })
      );
      setRewardName('');
      setPointsRequired('');
    }
  };

  return (
    <div>
      <h2>Loyalty Rewards Management</h2>
      <input
        type="text"
        placeholder="Reward Name"
        value={rewardName}
        onChange={(e) => setRewardName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Points Required"
        value={pointsRequired}
        onChange={(e) => setPointsRequired(e.target.value)}
      />
      <button onClick={handleAddReward}>Add Reward</button>
      <ul>
        {loyaltyRewards.map((reward: LoyaltyReward) => (
          <li key={reward.id}>
            {reward.name} - {reward.pointsRequired} points
            <button
              onClick={() =>
                dispatch(
                  updateReward({
                    id: reward.id,
                    pointsRequired: 200,
                    isActive: true,
                  })
                )
              }
            >
              Update Points to 200
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLoyaltyRewards;
