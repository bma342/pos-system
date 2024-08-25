import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrandingProfiles,
  addBrandingProfile,
  updateBrandingProfile,
  fetchBrandingProfiles,
} from '../redux/slices/brandingSlice';
import { RootState, AppDispatch, BrandingProfile } from '../types';
import { useParams } from 'react-router-dom';
import { fetchClientId } from '../api/clientApi';

const BrandingSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandingProfiles = useSelector((state: RootState) =>
    selectBrandingProfiles(state)
  );
  const { clientId } = useParams<{ clientId: string }>();
  const [currentProfile, setCurrentProfile] = useState<BrandingProfile>({
    id: 0,
    clientId: Number(clientId),
    name: '',
    logoUrl: '',
    primaryColor: '',
    secondaryColor: '',
    fontColor: '',
    secondaryFontColor: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchBrandingProfiles(Number(clientId)));
    }
  }, [dispatch, clientId]);

  useEffect(() => {
    if (brandingProfiles.length > 0) {
      setCurrentProfile((prev) => ({
        ...prev,
        ...brandingProfiles[0],
        id: brandingProfiles[0].id || 0,
      }));
    }
  }, [brandingProfiles]);

  useEffect(() => {
    const fetchClient = async () => {
      const id = await fetchClientId();
      // Use the fetched client ID if needed
      console.log('Fetched client ID:', id);
    };

    fetchClient();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (logoFile) {
      // Handle logo upload
      const formData = new FormData();
      formData.append('file', logoFile);
      formData.append('clientId', clientId?.toString() || '');

      try {
        const response = await fetch('/api/branding/upload-logo', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (data.url) {
          setCurrentProfile((prev) => ({ ...prev, logoUrl: data.url }));
        }
      } catch (error) {
        console.error('Error uploading logo:', error);
      }
    }

    if (currentProfile.id === 0) {
      dispatch(addBrandingProfile(currentProfile));
    } else {
      dispatch(updateBrandingProfile(currentProfile));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Branding Settings</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={currentProfile.name}
          onChange={(e) =>
            setCurrentProfile((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Logo URL"
          value={currentProfile.logoUrl}
          onChange={(e) =>
            setCurrentProfile((prev) => ({ ...prev, logoUrl: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          placeholder="Primary Color"
          value={currentProfile.primaryColor}
          onChange={(e) =>
            setCurrentProfile((prev) => ({
              ...prev,
              primaryColor: e.target.value,
            }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          placeholder="Secondary Color"
          value={currentProfile.secondaryColor}
          onChange={(e) =>
            setCurrentProfile((prev) => ({
              ...prev,
              secondaryColor: e.target.value,
            }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          placeholder="Font Color"
          value={currentProfile.fontColor}
          onChange={(e) =>
            setCurrentProfile((prev) => ({
              ...prev,
              fontColor: e.target.value,
            }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          placeholder="Secondary Font Color"
          value={currentProfile.secondaryFontColor}
          onChange={(e) =>
            setCurrentProfile((prev) => ({
              ...prev,
              secondaryFontColor: e.target.value,
            }))
          }
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Branding
        </button>
      </div>
    </div>
  );
};

export default BrandingSettings;
