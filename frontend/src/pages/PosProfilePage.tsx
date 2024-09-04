import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocationPOSProfiles, selectLocationPOSProfiles, selectPOSProfileLoading, selectPOSProfileError } from '../redux/slices/posProfileSlice';
import { LocationPOSProfile } from '../types/posTypes';
import { useSelectedLocation } from '../hooks/useSelectedLocation';

const PosProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const locationProfiles = useSelector(selectLocationPOSProfiles);
  const loading = useSelector(selectPOSProfileLoading);
  const error = useSelector(selectPOSProfileError);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchLocationPOSProfiles(selectedLocation));
    }
  }, [dispatch, selectedLocation]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>POS Profiles for Location: {selectedLocation}</h2>
      {locationProfiles.length === 0 ? (
        <p>No POS profiles found for this location.</p>
      ) : (
        locationProfiles.map((profile: LocationPOSProfile) => (
          <div key={profile.id}>
            <h3>Profile ID: {profile.id}</h3>
            <p>Core POS Profile ID: {profile.corePOSProfileId}</p>
            <p>Last Sync Status: {profile.lastSyncStatus}</p>
            {profile.lastSyncError && <p>Last Sync Error: {profile.lastSyncError}</p>}
            <h4>Custom Settings:</h4>
            <ul>
              {Object.entries(profile.customSettings).map(([key, value]) => (
                <li key={key}>{key}: {value.toString()}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PosProfilePage;