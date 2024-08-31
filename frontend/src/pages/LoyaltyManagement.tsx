import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchLoyaltyRewards,
  createLoyaltyReward,
  updateLoyaltyReward,
  deleteLoyaltyReward,
  fetchLoyaltyConfig,
  updateLoyaltyConfig,
} from '../redux/slices/loyaltySlice';
import { LoyaltyReward, LoyaltyConfig } from '../types';

const LoyaltyManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rewards, config, status, error } = useSelector(
    (state: RootState) => state.loyalty
  );
  const [newReward, setNewReward] = useState<Partial<LoyaltyReward>>({
    name: '',
    pointsRequired: 0,
    isActive: true,
  });
  const [editingConfig, setEditingConfig] = useState<LoyaltyConfig | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLoyaltyRewards());
    dispatch(fetchLoyaltyConfig());
  }, [dispatch]);

  const validateReward = (reward: Partial<LoyaltyReward>): boolean => {
    if (!reward.name || reward.name.trim() === '') {
      setFormError('Reward name is required');
      return false;
    }
    if (reward.pointsRequired === undefined || reward.pointsRequired < 0) {
      setFormError('Points required must be a positive number');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleCreateReward = () => {
    if (validateReward(newReward)) {
      dispatch(createLoyaltyReward(newReward));
      setNewReward({ name: '', pointsRequired: 0, isActive: true });
    }
  };

  const handleUpdateReward = (reward: LoyaltyReward) => {
    if (validateReward(reward)) {
      dispatch(updateLoyaltyReward(reward));
    }
  };

  const handleDeleteReward = (id: number) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      dispatch(deleteLoyaltyReward(id));
    }
  };

  const handleUpdateConfig = () => {
    if (editingConfig) {
      dispatch(updateLoyaltyConfig(editingConfig));
      setEditingConfig(null);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="loyalty-management">
      <h2>Loyalty Management</h2>

      <section className="loyalty-rewards">
        <h3>Loyalty Rewards</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateReward();
          }}
          className="reward-form"
        >
          <input
            type="text"
            value={newReward.name}
            onChange={(e) =>
              setNewReward({ ...newReward, name: e.target.value })
            }
            placeholder="Reward Name"
            required
          />
          <input
            type="number"
            value={newReward.pointsRequired}
            onChange={(e) =>
              setNewReward({
                ...newReward,
                pointsRequired: parseInt(e.target.value),
              })
            }
            placeholder="Points Required"
            required
            min="0"
          />
          <button type="submit">Add Reward</button>
        </form>
        {formError && <p className="error-message">{formError}</p>}

        <ul className="rewards-list">
          {rewards.map((reward) => (
            <li key={reward.id} className="reward-item">
              <input
                type="text"
                value={reward.name}
                onChange={(e) =>
                  handleUpdateReward({ ...reward, name: e.target.value })
                }
              />
              <input
                type="number"
                value={reward.pointsRequired}
                onChange={(e) =>
                  handleUpdateReward({
                    ...reward,
                    pointsRequired: parseInt(e.target.value),
                  })
                }
                min="0"
              />
              <button
                onClick={() =>
                  handleUpdateReward({ ...reward, isActive: !reward.isActive })
                }
              >
                {reward.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => handleDeleteReward(reward.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="loyalty-configuration">
        <h3>Loyalty Configuration</h3>
        {config && (
          <div className="tiers-config">
            <h4>Tiers</h4>
            {editingConfig ? (
              <>
                {editingConfig.tiers.map((tier, index) => (
                  <input
                    key={index}
                    type="text"
                    value={tier.tierName}
                    onChange={(e) => {
                      const newTiers = [...editingConfig.tiers];
                      newTiers[index] = { tierName: e.target.value };
                      setEditingConfig({ ...editingConfig, tiers: newTiers });
                    }}
                  />
                ))}
                <button
                  onClick={() =>
                    setEditingConfig({
                      ...editingConfig,
                      tiers: [...editingConfig.tiers, { tierName: '' }],
                    })
                  }
                >
                  Add Tier
                </button>
                <button onClick={handleUpdateConfig}>Save Configuration</button>
              </>
            ) : (
              <>
                <ul className="tiers-list">
                  {config.tiers.map((tier, index) => (
                    <li key={index}>{tier.tierName}</li>
                  ))}
                </ul>
                <button onClick={() => setEditingConfig(config)}>
                  Edit Configuration
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default LoyaltyManagement;
