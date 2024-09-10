import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProfiles } from '../redux/slices/posIntegrationSlice';
import { useAuth } from '../hooks/useAuth';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';

const PosProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { profiles, status, error } = useSelector((state: RootState) => state.posIntegration);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchProfiles(user.clientId));
    }
  }, [dispatch, user]);

  if (status === 'loading') return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        POS Profiles
      </Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem key={profile.id}>
            <ListItemText
              primary={profile.name}
              secondary={`Type: ${profile.type}, Active: ${profile.active ? 'Yes' : 'No'}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PosProfilePage;