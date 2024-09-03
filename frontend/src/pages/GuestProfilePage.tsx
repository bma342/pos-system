import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuestProfile } from '../api/guestApi';
import {
  getLoyaltyChallenges,
  getGuestChallengeProgress,
} from '../api/loyaltyChallengeApi';
import {
  GuestProfile,
  LoyaltyChallenge,
  LoyaltyChallengeProgress,
} from '../types';
import LoyaltyChallengeProgressComponent from '../components/LoyaltyChallengeProgressComponent';

const GuestProfilePage: React.FC = () => {
  const { guestId } = useParams<{ guestId: string }>();
  const [guestProfile, setGuestProfile] = useState<GuestProfile | null>(null);
  const [challenges, setChallenges] = useState<LoyaltyChallenge[]>([]);
  const [challengeProgress, setChallengeProgress] = useState<
    LoyaltyChallengeProgress[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetchGuestProfile(parseInt(guestId));
        setGuestProfile(profile);

        const allChallenges = await getLoyaltyChallenges();
        const activeChallenges = allChallenges.filter(
          (challenge) => challenge.status === 'active'
        );
        setChallenges(activeChallenges);

        const progress = await getGuestChallengeProgress(parseInt(guestId));
        setChallengeProgress(progress);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchData();
  }, [guestId]);

  if (!guestProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="guest-profile">
      <h1>
        {guestProfile.firstName} {guestProfile.lastName}&apos;s Profile
      </h1>
      <p>Email: {guestProfile.email}</p>
      <p>Loyalty Points: {guestProfile.loyaltyPoints}</p>
      <p>Loyalty Tier: {guestProfile.loyaltyTier}</p>

      <h2>Active Challenges</h2>
      {challenges.map((challenge) => {
        const progress = challengeProgress.find(
          (p) => p.challengeId === challenge.id
        );
        return progress ? (
          <LoyaltyChallengeProgressComponent
            key={challenge.id}
            challenge={challenge}
            progress={progress}
          />
        ) : null;
      })}
    </div>
  );
};

export default GuestProfilePage;
