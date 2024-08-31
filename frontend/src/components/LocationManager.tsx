import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { LocationService } from '../services/LocationService';
import { updateLocation } from '../redux/slices/locationSlice';
import { Location, LocationUpdateData } from '../types/locationTypes';

const LocationManager: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const dispatch = useDispatch();
  const locationService = useMemo(() => new LocationService(), []);

  const fetchLocations = useCallback(async () => {
    try {
      const fetchedLocations = await locationService.getLocations();
      setLocations(fetchedLocations);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  }, [locationService]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleUpdateLocation = useCallback(
    async (locationId: string, updateData: LocationUpdateData) => {
      try {
        const updatedLocation = await locationService.updateLocation(
          locationId,
          updateData
        );
        dispatch(updateLocation({ locationId, updateData: updatedLocation }));
        setLocations((prevLocations) =>
          prevLocations.map((loc) =>
            loc.id === locationId ? { ...loc, ...updatedLocation } : loc
          )
        );
      } catch (error) {
        console.error('Failed to update location:', error);
      }
    },
    [locationService, dispatch]
  );

  return (
    <div>
      <h2>Location Manager</h2>
      {locations.map((location) => (
        <div key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.address}</p>
          <button
            onClick={() =>
              handleUpdateLocation(location.id, { status: 'active' })
            }
          >
            Activate
          </button>
          <button
            onClick={() =>
              handleUpdateLocation(location.id, { status: 'inactive' })
            }
          >
            Deactivate
          </button>
        </div>
      ))}
    </div>
  );
};

export default LocationManager;
