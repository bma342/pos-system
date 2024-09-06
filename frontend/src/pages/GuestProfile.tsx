import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { GuestMetrics } from '../types/guestTypes';

const GuestProfile: React.FC = () => {
  const guestMetrics = useSelector(
    (state: RootState) => state.guest.metrics as GuestMetrics
  );

  if (!guestMetrics) {
    return <div>Loading guest profile...</div>;
  }

  return (
    <div>
      <h2>Guest Profile</h2>
      <p>Total Orders: {guestMetrics.totalOrders}</p>
      <p>Total Spent: ${guestMetrics.totalSpent.toFixed(2)}</p>
      <p>Loyalty Points: {guestMetrics.loyaltyPoints}</p>
      <p>Last Order Date: {new Date(guestMetrics.lastOrderDate).toLocaleDateString()}</p>
      <h3>Favorite Items:</h3>
      <ul>
        {guestMetrics.favoriteItems.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestProfile;
