import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  fetchLocations,
  selectLocations,
  selectLocationStatus,
} from '../redux/slices/locationSlice';

const OrderScheduling: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(selectLocations);
  const status = useSelector(selectLocationStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocations());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading locations...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading locations. Please try again.</div>;
  }

  return (
    <div>
      <h1>Order Scheduling</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      {/* Add your order scheduling logic here */}
    </div>
  );
};

export default OrderScheduling;