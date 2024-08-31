import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  fetchPOSProfiles,
  selectPOSProfiles,
  selectPOSProfileStatus,
} from '../redux/slices/posProfileSlice';

const PosProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profiles = useSelector(selectPOSProfiles);
  const status = useSelector(selectPOSProfileStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPOSProfiles());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading POS profiles...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading POS profiles. Please try again.</div>;
  }

  return (
    <div>
      <h1>POS Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.name}</li>
        ))}
      </ul>
      {/* Add your POS profile management logic here */}
    </div>
  );
};

export default PosProfilePage;