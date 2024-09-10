import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  fetchProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  syncProfile,
} from '../redux/slices/posIntegrationSlice';
import { POSProfile, POSType } from '../types/posTypes';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  CircularProgress,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
} from '@mui/material';

const POSIntegrationSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { profiles, status, error } = useSelector((state: RootState) => state.posIntegration);
  const [selectedProfile, setSelectedProfile] = useState<POSProfile | null>(null);
  const [newProfileData, setNewProfileData] = useState<Omit<POSProfile, 'id'>>({
    name: '',
    type: 'SQUARE' as POSType,
    apiKey: '',
    clientId: user?.clientId || '',
    active: true,
  });

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchProfiles(user.clientId));
    }
  }, [dispatch, user]);

  const handleProfileSelect = (event: SelectChangeEvent<string>) => {
    const profileId = event.target.value;
    const profile = profiles.find((p) => p.id === profileId) || null;
    setSelectedProfile(profile);
  };

  const handleProfileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setNewProfileData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateProfile = () => {
    dispatch(createProfile(newProfileData));
  };

  const handleUpdateProfile = () => {
    if (selectedProfile) {
      dispatch(updateProfile(selectedProfile));
    }
  };

  const handleDeleteProfile = () => {
    if (selectedProfile) {
      dispatch(deleteProfile(selectedProfile.id));
      setSelectedProfile(null);
    }
  };

  const handleSyncProfile = () => {
    if (selectedProfile) {
      dispatch(syncProfile(selectedProfile.id));
    }
  };

  if (status === 'loading') return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6">POS Integration</Typography>
      <Select
        value={selectedProfile?.id || ''}
        onChange={handleProfileSelect}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Select a POS profile
        </MenuItem>
        {profiles.map((profile) => (
          <MenuItem key={profile.id} value={profile.id}>
            {profile.name}
          </MenuItem>
        ))}
      </Select>
      {selectedProfile && (
        <Box mt={2}>
          <TextField
            label="Profile Name"
            value={selectedProfile.name}
            onChange={(e) =>
              setSelectedProfile({ ...selectedProfile, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="API Key"
            value={selectedProfile.apiKey}
            onChange={(e) =>
              setSelectedProfile({ ...selectedProfile, apiKey: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedProfile.active}
                onChange={(e) =>
                  setSelectedProfile({ ...selectedProfile, active: e.target.checked })
                }
              />
            }
            label="Active"
          />
          <Button onClick={handleUpdateProfile}>Update Profile</Button>
          <Button onClick={handleDeleteProfile}>Delete Profile</Button>
          <Button onClick={handleSyncProfile}>Sync Profile</Button>
        </Box>
      )}
      <Box mt={4}>
        <Typography variant="h6">Create New Profile</Typography>
        <TextField
          label="Profile Name"
          name="name"
          value={newProfileData.name}
          onChange={handleProfileInputChange}
          fullWidth
          margin="normal"
        />
        <Select
          value={newProfileData.type}
          onChange={(e: SelectChangeEvent<POSType>) =>
            setNewProfileData({ ...newProfileData, type: e.target.value as POSType })
          }
          fullWidth
        >
          <MenuItem value="SQUARE">Square</MenuItem>
          <MenuItem value="CLOVER">Clover</MenuItem>
          <MenuItem value="TOAST">Toast</MenuItem>
          <MenuItem value="LIGHTSPEED">Lightspeed</MenuItem>
          <MenuItem value="REVEL">Revel</MenuItem>
        </Select>
        <TextField
          label="API Key"
          name="apiKey"
          value={newProfileData.apiKey}
          onChange={handleProfileInputChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              name="active"
              checked={newProfileData.active}
              onChange={handleProfileInputChange}
            />
          }
          label="Active"
        />
        <Button onClick={handleCreateProfile}>Create Profile</Button>
      </Box>
    </Box>
  );
};

export default POSIntegrationSelector;
