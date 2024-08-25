import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateLocation } from '../redux/slices/locationSlice';
import { Location } from '../types';

const LocationManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.locations.locations
  );
  const selectedLocation = useSelector(
    (state: RootState) => state.locations.selectedLocation
  );

  const handleUpdateLocation = (id: number) => {
    const locationToUpdate = locations.find((loc) => loc.id === id);
    if (locationToUpdate) {
      dispatch(updateLocation({ ...locationToUpdate, name: 'Updated Name' }));
    }
  };

  return (
    <div>
      <h2>Location Management</h2>
      {locations.map((loc: Location) => (
        <div key={loc.id}>
          <span>{loc.name}</span>
          <button onClick={() => handleUpdateLocation(loc.id)}>Update</button>
        </div>
      ))}
      {selectedLocation && <p>Selected Location: {selectedLocation.name}</p>}
    </div>
  );
};

export default LocationManagement;
