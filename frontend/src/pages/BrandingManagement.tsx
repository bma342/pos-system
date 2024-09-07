import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchBrandingProfiles,
  createBrandingProfile,
  updateBrandingProfile,
  deleteBrandingProfile,
} from '../redux/slices/brandingSlice';
import { BrandingProfile, Client } from '../types/clientTypes'; // Update import path if necessary
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectBrandingProfiles } from '../redux/slices/brandingSlice';

const BrandingManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, status, error } = useSelector(selectBrandingProfiles);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const [newProfile, setNewProfile] = useState<Partial<BrandingProfile>>({
    name: '',
    logoUrl: '',
    primaryColor: '',
    secondaryColor: '',
    fontColor: '',
    clientId: 0,
  });

  useEffect(() => {
    dispatch(fetchBrandingProfiles());
  }, [dispatch]);

  const handleCreateProfile = () => {
    dispatch(createBrandingProfile(newProfile));
    setNewProfile({
      name: '',
      logoUrl: '',
      primaryColor: '',
      secondaryColor: '',
      fontColor: '',
      clientId: 0,
    });
  };

  const handleUpdateProfile = (profile: BrandingProfile) => {
    dispatch(updateBrandingProfile(profile));
  };

  const handleDeleteProfile = (id: number) => {
    if (
      window.confirm('Are you sure you want to delete this branding profile?')
    ) {
      dispatch(deleteBrandingProfile(id));
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Branding Management
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Profile Name"
          value={newProfile.name}
          onChange={(e) =>
            setNewProfile({ ...newProfile, name: e.target.value })
          }
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Logo URL"
          value={newProfile.logoUrl}
          onChange={(e) =>
            setNewProfile({ ...newProfile, logoUrl: e.target.value })
          }
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Primary Color"
          value={newProfile.primaryColor}
          onChange={(e) =>
            setNewProfile({ ...newProfile, primaryColor: e.target.value })
          }
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Secondary Color"
          value={newProfile.secondaryColor}
          onChange={(e) =>
            setNewProfile({ ...newProfile, secondaryColor: e.target.value })
          }
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Font Color"
          value={newProfile.fontColor}
          onChange={(e) =>
            setNewProfile({ ...newProfile, fontColor: e.target.value })
          }
          sx={{ marginRight: 1 }}
        />
        <Select
          value={newProfile.clientId}
          onChange={(e) =>
            setNewProfile({ ...newProfile, clientId: e.target.value as number })
          }
          sx={{ marginRight: 1 }}
        >
          {clients.map((client: Client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleCreateProfile} variant="contained">
          Add Profile
        </Button>
      </Box>

      <List>
        {profiles.map((profile: BrandingProfile) => (
          <ListItem key={profile.id}>
            <TextField
              value={profile.name}
              onChange={(e) =>
                handleUpdateProfile({ ...profile, name: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={profile.logoUrl}
              onChange={(e) =>
                handleUpdateProfile({ ...profile, logoUrl: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={profile.primaryColor}
              onChange={(e) =>
                handleUpdateProfile({
                  ...profile,
                  primaryColor: e.target.value,
                })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={profile.secondaryColor}
              onChange={(e) =>
                handleUpdateProfile({
                  ...profile,
                  secondaryColor: e.target.value,
                })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={profile.fontColor}
              onChange={(e) =>
                handleUpdateProfile({ ...profile, fontColor: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <Select
              value={profile.clientId}
              onChange={(e) =>
                handleUpdateProfile({
                  ...profile,
                  clientId: e.target.value as number,
                })
              }
              sx={{ marginRight: 1 }}
            >
              {clients.map((client: Client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => handleDeleteProfile(profile.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BrandingManagement;
