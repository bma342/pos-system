import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, GuestProfile as GuestProfileType } from '../types';

const GuestProfile: React.FC = () => {
  const guestProfile = useSelector(
    (state: RootState) => state.guest.profile as GuestProfileType
  );

  if (!guestProfile) {
    return <div>Loading guest profile...</div>;
  }

  return (
    <div>
      <h2>Guest Profile</h2>
      <p>
        Name: {guestProfile.firstName} {guestProfile.lastName}
      </p>
      <p>Loyalty Points: {guestProfile.loyaltyPoints}</p>
      {guestProfile.loyaltyTier && (
        <p>Loyalty Tier: {guestProfile.loyaltyTier}</p>
      )}
    </div>
  );
};

export default GuestProfile;
