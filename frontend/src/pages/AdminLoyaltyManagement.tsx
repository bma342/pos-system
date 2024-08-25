import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchLoyaltyConfig,
  updateLoyaltyConfig,
  selectLoyaltyConfig,
} from '../redux/slices/loyaltySlice';
import { AppDispatch } from '../redux/store';

const AdminLoyaltyManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId } = useParams<{ clientId: string }>(); // Extract clientId from params
  const loyaltyConfig = useSelector(selectLoyaltyConfig);
  const [newTier, setNewTier] = useState('');

  useEffect(() => {
    if (clientId) {
      dispatch(fetchLoyaltyConfig(Number(clientId))); // Pass clientId as number
    }
  }, [dispatch, clientId]);

  const handleUpdateLoyaltyConfig = () => {
    if (newTier) {
      const updatedConfig = {
        ...loyaltyConfig,
        tiers: [...loyaltyConfig.tiers, { tierName: newTier }],
      };
      dispatch(
        updateLoyaltyConfig({
          clientId: Number(clientId),
          config: updatedConfig,
        })
      );
      setNewTier('');
    }
  };

  return (
    <div>
      <h2>Loyalty Management</h2>
      <input
        type="text"
        placeholder="New Tier"
        value={newTier}
        onChange={(e) => setNewTier(e.target.value)}
      />
      <button onClick={handleUpdateLoyaltyConfig}>Update Loyalty Config</button>
      <ul>
        {loyaltyConfig.tiers.map(
          (tier: { tierName: string }, index: number) => (
            <li key={index}>{tier.tierName}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default AdminLoyaltyManagement;
