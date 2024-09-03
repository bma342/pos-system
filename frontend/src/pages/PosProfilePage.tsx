import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPOSProfiles } from '../redux/slices/posProfileSlice';
import { POSProfile } from '../types';

const PosProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, error } = useSelector((state: RootState) => state.posProfile);

  useEffect(() => {
    dispatch(fetchPOSProfiles());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h2>POS Profiles</h2>
      {profiles.length === 0 ? (
        <p>No POS profiles found.</p>
      ) : (
        profiles.map((profile: POSProfile) => (
          <div key={profile.id}>
            <h3>{profile.name}</h3>
            <p>Provider: {profile.provider}</p>
            <p>Status: {profile.status}</p>
            {profile.lastSyncTime && (
              <p>Last Synced: {new Date(profile.lastSyncTime).toLocaleString()}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PosProfilePage;