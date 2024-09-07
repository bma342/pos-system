import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchGuestMetrics, selectGuestMetrics, selectGuestLoading, selectGuestError } from '../redux/slices/guestSlice';
import { GuestMetrics } from '../types/guestTypes';

const GuestProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const guestMetrics = useSelector(selectGuestMetrics);
  const loading = useSelector(selectGuestLoading);
  const error = useSelector(selectGuestError);

  useEffect(() => {
    // Assuming you have the locationId and guestId available
    const locationId = '123'; // Replace with actual locationId
    const guestId = '456'; // Replace with actual guestId
    dispatch(fetchGuestMetrics({ locationId, guestId }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!guestMetrics) return <div>No guest metrics available</div>;

  return (
    <div>
      <h2>Guest Profile</h2>
      <p>Total Orders: {guestMetrics.totalOrders}</p>
      <p>Total Spent: ${guestMetrics.totalSpent.toFixed(2)}</p>
      <p>Average Order Value: ${guestMetrics.averageOrderValue.toFixed(2)}</p>
      {/* Add more metrics as needed */}
    </div>
  );
};

export default GuestProfile;
