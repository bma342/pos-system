import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateLocation } from '../redux/slices/locationSlice';
import { Location } from '../types';

const LocationSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleUpdateSettings = () => {
    const locationUpdate: Partial<Location> & { id: number } = {
      id: parseInt(selectedLocation),
      // Add any other fields you want to update
    };
    dispatch(updateLocation(locationUpdate));
  };

  return (
    <div>
      <h2>Location Settings</h2>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">Select Location</option>
        {/* Add location options dynamically */}
      </select>
      <select
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
      >
        <option value="">Select Provider</option>
        {/* Add provider options dynamically */}
      </select>
      <button onClick={handleUpdateSettings}>Update Settings</button>
    </div>
  );
};

export default LocationSettings;
