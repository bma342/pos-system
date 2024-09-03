import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCorePOSProfiles,
  createCorePOSProfile,
  updateCorePOSProfile,
  deleteCorePOSProfile,
  syncPOSProfile,
  selectCorePOSProfiles,
  selectCorePOSProfileStatus,
  selectCorePOSProfileError,
} from '../redux/slices/corePOSProfileSlice';
import { CorePOSProfile } from '../types/posTypes';
import { AppDispatch } from '../redux/store';

const CorePOSProfileManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profiles = useSelector(selectCorePOSProfiles);
  const status = useSelector(selectCorePOSProfileStatus);
  const error = useSelector(selectCorePOSProfileError);

  const [selectedProfile, setSelectedProfile] = useState<CorePOSProfile | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCorePOSProfiles());
    }
  }, [status, dispatch]);

  const handleCreateProfile = (profile: Omit<CorePOSProfile, 'id'>) => {
    dispatch(createCorePOSProfile(profile));
  };

  const handleUpdateProfile = (
    id: string,
    profile: Partial<CorePOSProfile>
  ) => {
    dispatch(updateCorePOSProfile({ id, profile }));
    setIsEditing(false);
    setSelectedProfile(null);
  };

  const handleDeleteProfile = (id: string) => {
    dispatch(deleteCorePOSProfile(id));
  };

  const handleSyncProfile = (id: string) => {
    dispatch(syncPOSProfile(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Core POS Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} - {profile.apiEndpoint}
            <button onClick={() => setSelectedProfile(profile)}>Edit</button>
            <button onClick={() => handleDeleteProfile(profile.id)}>
              Delete
            </button>
            <button onClick={() => handleSyncProfile(profile.id)}>Sync</button>
          </li>
        ))}
      </ul>
      {selectedProfile && (
        <div>
          <h3>{isEditing ? 'Edit Profile' : 'Profile Details'}</h3>
          {/* Add form fields for editing/viewing profile details */}
          {isEditing ? (
            <button
              onClick={() =>
                handleUpdateProfile(selectedProfile.id, selectedProfile)
              }
            >
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      )}
      <div>
        <h3>Create New Profile</h3>
        {/* Add form for creating new profile */}
        <button
          onClick={() =>
            handleCreateProfile({
              /* new profile data */
            })
          }
        >
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default CorePOSProfileManager;
