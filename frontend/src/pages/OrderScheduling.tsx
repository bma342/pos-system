import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations, setLocations } from '../redux/slices/locationSlice';
import { Location } from '../types';

const OrderScheduling: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

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
