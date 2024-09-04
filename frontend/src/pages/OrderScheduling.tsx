import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations, selectLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';

const OrderScheduling: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(selectLocations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div>
      <h2>Order Scheduling</h2>
      <select>
        {locations.map((location: Location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderScheduling;
