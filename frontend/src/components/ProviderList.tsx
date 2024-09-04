import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviders } from '../redux/slices/providerSlice';
import { Provider } from '../types/providerTypes';
import { AppDispatch, RootState } from '../redux/store';
import { Typography, List, ListItem, ListItemText, Paper, Box, CircularProgress } from '@mui/material';

const ProviderList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { providers, loading, error } = useSelector((state: RootState) => state.provider);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Providers
        </Typography>
        <List>
          {providers.map((provider: Provider) => (
            <ListItem key={provider.id}>
              <ListItemText
                primary={provider.name}
                secondary={`Type: ${provider.type} | Status: ${provider.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default ProviderList;
