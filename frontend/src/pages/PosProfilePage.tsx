import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPOSProfiles } from '../redux/slices/posProfileSlice';
import { POSProfile } from '../types';

const PosProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profiles = useSelector((state: RootState) => state.posProfile.profiles);
  const status = useSelector((state: RootState) => state.posProfile.status);

  useEffect(() => {
    dispatch(fetchPOSProfiles());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading POS profiles</div>;

  return (
    <div>
      <h2>POS Profiles</h2>
      {profiles.map((profile: POSProfile) => (
        <div key={profile.id}>
          <h3>{profile.name}</h3>
          <p>{profile.provider}</p>
        </div>
      ))}
    </div>
  );
};

export default PosProfilePage;
