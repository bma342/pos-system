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
  Paper,
  Box,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  syncProfile,
} from '../redux/slices/posIntegrationSlice';
import { POSType, POSProfile } from '../types/posIntegrationTypes';

const POSIntegrationSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, status, error } = useSelector((state: RootState) => state.posIntegration);
  const [newProfile, setNewProfile] = useState<Partial<POSProfile>>({
    name: '',
    posType: POSType.TOAST,
    apiEndpoint: '',
    apiKey: '',
  });
  const [editingProfile, setEditingProfile] = useState<POSProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const handleProfileInputChange = (
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setNewProfile((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleCreateProfile = async () => {
    dispatch(createProfile(newProfile as POSProfile));
    setNewProfile({
      name: '',
      posType: POSType.TOAST,
      apiEndpoint: '',
      apiKey: '',
    });
  };

  const handleEditProfile = (profile: POSProfile) => {
    setEditingProfile(profile);
    setIsDialogOpen(true);
  };

  const handleUpdateProfile = async () => {
    if (editingProfile) {
      dispatch(updateProfile(editingProfile));
      setIsDialogOpen(false);
    }
  };

  const handleDeleteProfile = async (profileId: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      dispatch(deleteProfile(profileId));
    }
  };

  const handleSyncProfile = async (profileId: number) => {
    dispatch(syncProfile(profileId));
  };

  if (status === 'loading') {
    return <Typography>Loading POS profiles...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>POS Integration Manager</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Create New POS Profile</Typography>
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
                onChange={handleProfileInputChange}
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
            <Typography variant="h5" gutterBottom>Existing POS Profiles</Typography>
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
        </Grid>
      </Box>
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
    </Paper>
  );
};

export default POSIntegrationSelector;
