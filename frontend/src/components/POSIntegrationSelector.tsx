import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { POSIntegrationService } from '../services/POSIntegrationService';
import { POSType } from '../types/posIntegrationTypes';

interface POSProfile {
  id: number;
  tenantId: string;
  posType: POSType;
  apiKey: string;
  isActive: boolean;
  lastSyncDate: string;
  name: string;
  apiEndpoint: string;
}

const POSIntegrationSelector: React.FC = () => {
  const [profiles, setProfiles] = useState<POSProfile[]>([]);
  const [newProfile, setNewProfile] = useState<Partial<POSProfile>>({
    name: '',
    posType: POSType.TOAST,
    apiEndpoint: '',
    apiKey: '',
  });
  const [editingProfile, setEditingProfile] = useState<POSProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const posIntegrationService = new POSIntegrationService();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const fetchedProfiles = await posIntegrationService.getProfiles();
      setProfiles(fetchedProfiles);
    } catch (error) {
      console.error('Failed to fetch POS profiles:', error);
    }
  };

  const handleProfileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleCreateProfile = async () => {
    try {
      await posIntegrationService.createProfile(newProfile as POSProfile);
      setNewProfile({
        name: '',
        posType: POSType.TOAST,
        apiEndpoint: '',
        apiKey: '',
      });
      fetchProfiles();
    } catch (error) {
      console.error('Failed to create POS profile:', error);
    }
  };

  const handleEditProfile = (profile: POSProfile) => {
    setEditingProfile(profile);
    setIsDialogOpen(true);
  };

  const handleUpdateProfile = async () => {
    if (editingProfile) {
      try {
        await posIntegrationService.updateProfile(editingProfile);
        setIsDialogOpen(false);
        fetchProfiles();
      } catch (error) {
        console.error('Failed to update POS profile:', error);
      }
    }
  };

  const handleDeleteProfile = async (profileId: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await posIntegrationService.deleteProfile(profileId);
        fetchProfiles();
      } catch (error) {
        console.error('Failed to delete POS profile:', error);
      }
    }
  };

  const handleSyncProfile = async (profileId: number) => {
    try {
      await posIntegrationService.syncProfile(profileId);
      alert('Sync initiated successfully');
    } catch (error) {
      console.error('Failed to sync POS profile:', error);
      alert('Error initiating sync');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">POS Integration Manager</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Create New POS Profile</Typography>
        <TextField
          name="name"
          label="Profile Name"
          value={newProfile.name}
          onChange={handleProfileInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="pos-type-select-label">POS Type</InputLabel>
          <Select
            labelId="pos-type-select-label"
            name="posType"
            value={newProfile.posType}
            onChange={handleProfileInputChange as any}
          >
            {Object.values(POSType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="apiEndpoint"
          label="API Endpoint"
          value={newProfile.apiEndpoint}
          onChange={handleProfileInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="apiKey"
          label="API Key"
          value={newProfile.apiKey}
          onChange={handleProfileInputChange}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleCreateProfile}
          variant="contained"
          color="primary"
        >
          Create Profile
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Existing POS Profiles</Typography>
        <List>
          {profiles.map((profile) => (
            <ListItem key={profile.id}>
              <ListItemText
                primary={profile.name}
                secondary={`${profile.posType} - ${profile.apiEndpoint}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditProfile(profile)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteProfile(profile.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="sync"
                  onClick={() => handleSyncProfile(profile.id)}
                >
                  <SyncIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit POS Profile</DialogTitle>
        <DialogContent>
          {editingProfile && (
            <>
              <TextField
                name="name"
                label="Profile Name"
                value={editingProfile.name}
                onChange={(event) =>
                  setEditingProfile({
                    ...editingProfile,
                    name: event.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="pos-type-select-label">POS Type</InputLabel>
                <Select
                  labelId="pos-type-select-label"
                  name="posType"
                  value={editingProfile.posType}
                  onChange={(event) =>
                    setEditingProfile({
                      ...editingProfile,
                      posType: event.target.value as POSType,
                    })
                  }
                >
                  {Object.values(POSType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="apiEndpoint"
                label="API Endpoint"
                value={editingProfile.apiEndpoint}
                onChange={(event) =>
                  setEditingProfile({
                    ...editingProfile,
                    apiEndpoint: event.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                name="apiKey"
                label="API Key"
                value={editingProfile.apiKey}
                onChange={(event) =>
                  setEditingProfile({
                    ...editingProfile,
                    apiKey: event.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateProfile}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default POSIntegrationSelector;
