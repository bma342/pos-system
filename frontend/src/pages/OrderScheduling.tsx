import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types';

const OrderScheduling: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.locations.locations
  );
  const status = useSelector((state: RootState) => state.locations.status);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading locations</div>;

  return (
    <div>
      <h2>Order Scheduling</h2>
      <select>
        {locations.map((location: Location) => (
          <option key={location.id} value={location.id.toString()}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderScheduling;
