import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../types';
import {
  fetchDashboardStats,
  selectDashboardStats,
  selectDashboardStatus,
  selectDashboardError,
} from '../redux/slices/dashboardSlice';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout'; // Ensure this file exists and accepts children

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Dashboard: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const stats = useSelector(selectDashboardStats);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardStats());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  if (status === 'failed') {
    return (
      <LoadingWrapper>
        <Typography color="error">Error: {error}</Typography>
      </LoadingWrapper>
    );
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <List>
        {stats.map((stat) => (
          <ListItem key={stat.id}>
            <ListItemText primary={`${stat.label}: ${stat.value}`} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
