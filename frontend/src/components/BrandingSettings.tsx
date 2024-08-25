import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrandingProfiles,
  addBrandingProfile,
  updateBrandingProfile,
  fetchBrandingProfiles,
} from '../redux/slices/brandingSlice';
import { BrandingProfile, AppDispatch, RootState } from '../types';
import { useClientContext } from '../context/ClientContext';

const BrandingSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandingProfiles = useSelector((state: RootState) =>
    selectBrandingProfiles(state)
  );
  const [currentProfile, setCurrentProfile] = useState<BrandingProfile>(
    brandingProfiles[0] || {
      id: 0,
      name: '',
      logoUrl: '',
      primaryColor: '',
      secondaryColor: '',
      fontColor: '',
      secondaryFontColor: '',
      logo: '',
    }
  );

  const { clientId, isLoading, error } = useClientContext();

  useEffect(() => {
    if (clientId !== null) {
      dispatch(fetchBrandingProfiles(clientId));
    }
  }, [dispatch, clientId]);

  useEffect(() => {
    if (brandingProfiles.length > 0 && currentProfile.id === 0) {
      setCurrentProfile(brandingProfiles[0]);
    }
  }, [brandingProfiles, currentProfile.id]);

  const handleSave = () => {
    if (currentProfile.id === 0) {
      dispatch(addBrandingProfile(currentProfile));
    } else {
      dispatch(updateBrandingProfile(currentProfile));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (clientId === null) return <p>No client ID available</p>;

  return (
    <div>
      <h2>Branding Settings</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={currentProfile.name}
          onChange={(e) =>
            setCurrentProfile((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Logo URL"
          value={currentProfile.logoUrl}
          onChange={(e) =>
            setCurrentProfile((prev) => ({ ...prev, logoUrl: e.target.value }))
          }
        />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default BrandingSettings;
