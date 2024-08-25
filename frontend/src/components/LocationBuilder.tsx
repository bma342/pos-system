import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../redux/slices/locationSlice';
import { Location } from '../types';
import { AppDispatch } from '../redux/store';

const LocationBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [location, setLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    gpsCoordinates: '',
  });

  const handleSave = () => {
    if (location.name && location.address) {
      dispatch(updateLocation({ ...location, id: 0 }));
    }
  };

  return (
    <div>
      <h2>Location Builder</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={location.name}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={location.address}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, address: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="GPS Coordinates"
          value={location.gpsCoordinates || ''}
          onChange={(e) =>
            setLocation((prev) => ({
              ...prev,
              gpsCoordinates: e.target.value,
            }))
          }
        />
        <button type="button" onClick={handleSave}>
          Save Location
        </button>
      </form>
    </div>
  );
};

export default LocationBuilder;
