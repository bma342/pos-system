import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProviders } from '../redux/slices/providerSlice';
import { useAuth } from '../hooks/useAuth';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';

const ProviderList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { providers, loading, error } = useSelector((state: RootState) => state.provider);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchProviders(user.clientId));
    }
  }, [dispatch, user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Providers
      </Typography>
      <List>
        {providers.map((provider) => (
          <ListItem key={provider.id}>
            <ListItemText
              primary={provider.name}
              secondary={`Type: ${provider.type} | Status: ${provider.isActive ? 'Active' : 'Inactive'}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProviderList;
