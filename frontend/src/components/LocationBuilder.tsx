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
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    latitude: 0, // Added latitude
    longitude: 0, // Added longitude
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
        <input
          type="text"
          placeholder="City"
          value={location.city || ''}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, city: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="State"
          value={location.state || ''}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, state: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={location.zipCode || ''}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, zipCode: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={location.phoneNumber || ''}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={location.email || ''}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, email: e.target.value }))
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
