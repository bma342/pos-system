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
import { TextField, Button, Select, MenuItem, Box, Typography, CircularProgress } from '@mui/material';
import { SketchPicker } from 'react-color';

const BrandingSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandingProfiles = useSelector(selectBrandingProfiles);
  const [currentProfile, setCurrentProfile] = useState<BrandingProfile>(
    brandingProfiles[0] || {
      id: 0,
      name: '',
      logoUrl: '',
      primaryColor: '#ffffff',
      secondaryColor: '#000000',
      fontColor: '#000000',
      secondaryFontColor: '#ffffff',
      fontFamily: 'Arial',
      logo: '',
    }
  );
  const [activeColor, setActiveColor] = useState<string | null>(null);

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

  const handleColorChange = (color: string, field: keyof BrandingProfile) => {
    setCurrentProfile(prev => ({ ...prev, [field]: color }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProfile(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <CircularProgress className="m-4" />;
  if (error) return <Typography color="error" className="m-4">{error}</Typography>;
  if (clientId === null) return <Typography className="m-4">No client ID available</Typography>;

  return (
    <Box className="p-4 max-w-2xl mx-auto">
      <Typography variant="h4" className="mb-4">Branding Settings</Typography>
      <Select
        value={currentProfile.id}
        onChange={(e) => setCurrentProfile(brandingProfiles.find(p => p.id === e.target.value) || currentProfile)}
        className="mb-4 w-full"
      >
        {brandingProfiles.map((profile) => (
          <MenuItem key={profile.id} value={profile.id}>{profile.name}</MenuItem>
        ))}
      </Select>
      <form className="space-y-4">
        <TextField
          fullWidth
          label="Profile Name"
          value={currentProfile.name}
          onChange={(e) => setCurrentProfile(prev => ({ ...prev, name: e.target.value }))}
        />
        <TextField
          fullWidth
          label="Logo URL"
          value={currentProfile.logoUrl}
          onChange={(e) => setCurrentProfile(prev => ({ ...prev, logoUrl: e.target.value }))}
        />
        <Box>
          <Typography>Logo Upload</Typography>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="mt-1" />
        </Box>
        {['primaryColor', 'secondaryColor', 'fontColor', 'secondaryFontColor'].map((color) => (
          <Box key={color}>
            <Typography>{color}</Typography>
            <Button
              onClick={() => setActiveColor(activeColor === color ? null : color)}
              style={{ backgroundColor: currentProfile[color as keyof BrandingProfile] as string }}
              className="w-full h-10"
            />
            {activeColor === color && (
              <SketchPicker
                color={currentProfile[color as keyof BrandingProfile] as string}
                onChange={(c) => handleColorChange(c.hex, color as keyof BrandingProfile)}
              />
            )}
          </Box>
        ))}
        <TextField
          fullWidth
          label="Font Family"
          value={currentProfile.fontFamily}
          onChange={(e) => setCurrentProfile(prev => ({ ...prev, fontFamily: e.target.value }))}
        />
        <Button variant="contained" color="primary" onClick={handleSave} className="w-full">
          Save
        </Button>
      </form>
      <Box className="mt-8 p-4 border rounded" style={{
        backgroundColor: currentProfile.primaryColor,
        color: currentProfile.fontColor,
        fontFamily: currentProfile.fontFamily,
      }}>
        <Typography>Preview</Typography>
        <p>This is how your branding will look.</p>
        <Button style={{ backgroundColor: currentProfile.secondaryColor, color: currentProfile.secondaryFontColor }}>
          Sample Button
        </Button>
      </Box>
    </Box>
  );
};

export default BrandingSettings;
