import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuestMetrics } from '../api/guestApi';
import {
  getLoyaltyChallenges,
  getGuestChallengeProgress,
} from '../api/loyaltyChallengeApi';
import { GuestMetrics } from '../types/guestTypes';
import { LoyaltyChallenge, LoyaltyChallengeProgress } from '../types/loyaltyTypes';
import LoyaltyChallengeProgressComponent from '../components/LoyaltyChallengeProgress';

const GuestProfilePage: React.FC = () => {
  const { guestId } = useParams<{ guestId: string }>();
  const [guestMetrics, setGuestMetrics] = useState<GuestMetrics | null>(null);
  const [challenges, setChallenges] = useState<LoyaltyChallenge[]>([]);
  const [challengeProgress, setChallengeProgress] = useState<LoyaltyChallengeProgress[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!guestId) return;
      try {
        const metrics = await fetchGuestMetrics(guestId);
        setGuestMetrics(metrics);

        const allChallenges = await getLoyaltyChallenges();
        const activeChallenges = allChallenges.filter(
          (challenge) => challenge.status === 'active'
        );
        setChallenges(activeChallenges);

        const progress = await getGuestChallengeProgress(guestId);
        setChallengeProgress(progress);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchData();
  }, [guestId]);

  if (!guestMetrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="guest-profile">
      <h1>Guest Profile</h1>
      <p>Total Orders: {guestMetrics.totalOrders}</p>
      <p>Total Spent: ${guestMetrics.totalSpent.toFixed(2)}</p>
      <p>Loyalty Points: {guestMetrics.loyaltyPoints}</p>
      <p>Last Order Date: {new Date(guestMetrics.lastOrderDate).toLocaleDateString()}</p>

      <h2>Active Challenges</h2>
      {challenges.map((challenge) => {
        const progress = challengeProgress.find(
          (p) => p.challengeId === challenge.id
        );
        return progress ? (
          <LoyaltyChallengeProgressComponent
            key={challenge.id}
            challenge={challenge}
            currentProgress={progress.currentValue}
          />
        ) : null;
      })}
    </div>
  );
};

export default GuestProfilePage;
