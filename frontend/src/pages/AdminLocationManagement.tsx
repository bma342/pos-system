import React, { useEffect, useState } from 'react';
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../api/locationApi';
import { Location } from '../types';

const AdminLocationManagement: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const data = await fetchLocations();
      setLocations(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load locations.');
      setLoading(false);
    }
  };

  const handleCreateLocation = async () => {
    try {
      const newLocation = {
        name: 'New Location',
        address: '1234 Main St',
      };
      await createLocation(newLocation);
      loadLocations();
    } catch (err) {
      setError('Failed to create location.');
    }
  };

  const handleUpdateLocation = async (locationId: number) => {
    try {
      const updatedLocation = {
        name: 'Updated Location',
        address: '5678 Elm St',
      };
      await updateLocation(locationId, updatedLocation);
      loadLocations();
    } catch (err) {
      setError('Failed to update location.');
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    try {
      await deleteLocation(locationId);
      loadLocations();
    } catch (err) {
      setError('Failed to delete location.');
    }
  };

  return (
    <div>
      <h2>Admin Location Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <button onClick={handleCreateLocation}>Create Location</button>
          <ul>
            {locations.map((location) => (
              <li key={location.id}>
                {location.name}: {location.address}
                <button onClick={() => handleUpdateLocation(location.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteLocation(location.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminLocationManagement;
