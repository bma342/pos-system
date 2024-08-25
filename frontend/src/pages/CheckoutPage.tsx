import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { scheduleOrder } from '../redux/slices/orderSlice';
import { AppDispatch } from '../redux/store';
import { Location } from '../types';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.locations.locations
  );
  const [selectedLocation, setSelectedLocation] = useState('');
  const [timeSlot, setTimeSlot] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleTimeSlotAdjustment = (date: Date | null) => {
    if (date) {
      setTimeSlot(date);
    }
  };

  const handleOrderSchedule = () => {
    if (selectedLocation && timeSlot) {
      dispatch(scheduleOrder({ locationId: selectedLocation, timeSlot }));
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {locations.map((location: Location) => (
          <option key={location.id} value={location.id.toString()}>
            {location.name}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        onChange={(e) => handleTimeSlotAdjustment(new Date(e.target.value))}
      />
      <button onClick={handleOrderSchedule}>Schedule Order</button>
    </div>
  );
};

export default CheckoutPage;
