import React, { useState, useEffect } from 'react';
import {
  getLoyaltyChallenges,
  createLoyaltyChallenge,
  updateLoyaltyChallenge,
  deleteLoyaltyChallenge,
} from '../api/loyaltyChallengeApi';
import { LoyaltyChallenge, MenuItem, MenuGroup } from '../types';

// Assume we have these functions to fetch menu items and groups
import { getMenuItems, getMenuGroups } from '../api/menuApi';

const LoyaltyChallengeManager: React.FC = () => {
  const [challenges, setChallenges] = useState<LoyaltyChallenge[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([]);
  const [newChallenge, setNewChallenge] = useState<
    Omit<LoyaltyChallenge, 'id'>
  >({
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
      const fetchedChallenges = await getLoyaltyChallenges();
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
    <div>
      <h2>Loyalty Challenge Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newChallenge.name}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, name: e.target.value })
          }
          placeholder="Challenge Name"
          required
        />
        <textarea
          value={newChallenge.description}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, description: e.target.value })
          }
          placeholder="Description"
          required
        />
        <select
          value={newChallenge.challengeType}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, challengeType: e.target.value })
          }
          required
        >
          <option value="purchase-based">Purchase-based</option>
          <option value="engagement-based">Engagement-based</option>
        </select>

        <h3>Conditions</h3>
        <input
          type="number"
          value={newChallenge.conditions.itemCount}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              conditions: {
                ...newChallenge.conditions,
                itemCount: parseInt(e.target.value),
              },
            })
          }
          placeholder="Item Count"
        />
        <input
          type="text"
          value={newChallenge.conditions.timeframe}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              conditions: {
                ...newChallenge.conditions,
                timeframe: e.target.value,
              },
            })
          }
          placeholder="Timeframe (e.g., '1 month')"
        />
        <input
          type="number"
          value={newChallenge.conditions.minSpend}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              conditions: {
                ...newChallenge.conditions,
                minSpend: parseFloat(e.target.value),
              },
            })
          }
          placeholder="Minimum Spend"
        />

        <label>
          Frequency:
          <select
            value={newChallenge.conditions.frequency}
            onChange={(e) =>
              setNewChallenge({
                ...newChallenge,
                conditions: {
                  ...newChallenge.conditions,
                  frequency: e.target
                    .value as LoyaltyChallenge['conditions']['frequency'],
                },
              })
            }
          >
            <option value="unlimited">Unlimited</option>
            <option value="once_per_day">Once per day</option>
            <option value="once_per_week">Once per week</option>
            <option value="once_per_month">Once per month</option>
          </select>
        </label>

        <h4>Restricted Menu Items</h4>
        <select
          multiple
          value={newChallenge.conditions.restrictedMenuItems}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              conditions: {
                ...newChallenge.conditions,
                restrictedMenuItems: Array.from(
                  e.target.selectedOptions,
                  (option) => Number(option.value)
                ),
              },
            })
          }
        >
          {menuItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <h4>Restricted Menu Groups</h4>
        <select
          multiple
          value={newChallenge.conditions.restrictedMenuGroups}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              conditions: {
                ...newChallenge.conditions,
                restrictedMenuGroups: Array.from(
                  e.target.selectedOptions,
                  (option) => Number(option.value)
                ),
              },
            })
          }
        >
          {menuGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <h3>Reward Configuration</h3>
        <input
          type="text"
          value={newChallenge.rewardConfig.reward}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              rewardConfig: {
                ...newChallenge.rewardConfig,
                reward: e.target.value,
              },
            })
          }
          placeholder="Reward Description"
        />
        <input
          type="number"
          value={newChallenge.rewardConfig.points}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              rewardConfig: {
                ...newChallenge.rewardConfig,
                points: parseInt(e.target.value),
              },
            })
          }
          placeholder="Points"
        />
        <input
          type="number"
          value={newChallenge.rewardConfig.discount}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              rewardConfig: {
                ...newChallenge.rewardConfig,
                discount: parseFloat(e.target.value),
              },
            })
          }
          placeholder="Discount Percentage"
        />

        <input
          type="date"
          value={newChallenge.startDate.toISOString().split('T')[0]}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              startDate: new Date(e.target.value),
            })
          }
          required
        />
        <input
          type="date"
          value={newChallenge.endDate.toISOString().split('T')[0]}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              endDate: new Date(e.target.value),
            })
          }
          required
        />
        <input
          type="number"
          value={newChallenge.locationId}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              locationId: parseInt(e.target.value),
            })
          }
          placeholder="Location ID"
          required
        />
        <input
          type="number"
          value={newChallenge.clientId}
          onChange={(e) =>
            setNewChallenge({
              ...newChallenge,
              clientId: parseInt(e.target.value),
            })
          }
          placeholder="Client ID"
          required
        />
        <button type="submit">Create Loyalty Challenge</button>
      </form>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <h3>{challenge.name}</h3>
            <p>Type: {challenge.challengeType}</p>
            <p>Status: {challenge.status}</p>
            <p>
              Conditions: Item Count: {challenge.conditions.itemCount},
              Timeframe: {challenge.conditions.timeframe}, Min Spend: $
              {challenge.conditions.minSpend}, Frequency:{' '}
              {challenge.conditions.frequency.replace(/_/g, ' ')}
            </p>
            <p>Reward: {JSON.stringify(challenge.rewardConfig)}</p>
            <p>Start Date: {challenge.startDate.toLocaleDateString()}</p>
            <p>End Date: {challenge.endDate.toLocaleDateString()}</p>
            <p>Participants: {challenge.participantCount}</p>
            <p>
              Restricted Menu Items:{' '}
              {challenge.conditions.restrictedMenuItems?.join(', ') || 'None'}
            </p>
            <p>
              Restricted Menu Groups:{' '}
              {challenge.conditions.restrictedMenuGroups?.join(', ') || 'None'}
            </p>
            <button onClick={() => handleDelete(challenge.id)}>Delete</button>
            <button
              onClick={() =>
                handleUpdate(challenge.id, {
                  status: challenge.status === 'active' ? 'inactive' : 'active',
                })
              }
            >
              {challenge.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoyaltyChallengeManager;
