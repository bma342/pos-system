import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRealtimeMetrics } from '../redux/slices/metricsSlice';
import { useAuth } from '../hooks/useAuth';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const MetricBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--border-radius)',
  boxShadow: theme.shadows[1],
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const MetricItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const RealtimeMetricsTicker: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { data: metrics, loading, error } = useSelector((state: RootState) => state.metrics);

  useEffect(() => {
    const fetchMetrics = () => {
      if (user?.clientId) {
        dispatch(fetchRealtimeMetrics(user.clientId));
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, [dispatch, user]);

  if (loading) return <CircularProgress size={24} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!metrics) return null;

  return (
    <MetricBox aria-label="Real-time metrics">
      <MetricItem>
        <Typography variant="h6">{metrics.orders}</Typography>
        <Typography variant="body2">Orders</Typography>
      </MetricItem>
      <MetricItem>
        <Typography variant="h6">${metrics.revenue.toFixed(2)}</Typography>
        <Typography variant="body2">Revenue</Typography>
      </MetricItem>
      <MetricItem>
        <Typography variant="h6">{metrics.customers}</Typography>
        <Typography variant="body2">Customers</Typography>
      </MetricItem>
    </MetricBox>
  );
};

export default RealtimeMetricsTicker;
