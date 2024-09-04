import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMarketingMetricsAsync } from '../redux/slices/marketingSlice';
import ABTestManager from './ABTestManager';
import MarketingCampaigns from './MarketingCampaigns';
import {
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';

const MarketingDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { metrics, status, error } = useSelector(
    (state: RootState) => state.marketing
  );

  useEffect(() => {
    dispatch(fetchMarketingMetricsAsync());
  }, [dispatch]);

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box className="marketing-dashboard">
      <Typography variant="h4" gutterBottom>Marketing Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Customer Acquisition Cost</Typography>
            <Typography variant="h4">${metrics.customerAcquisitionCost.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Customer Lifetime Value</Typography>
            <Typography variant="h4">${metrics.customerLifetimeValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Conversion Rate</Typography>
            <Typography variant="h4">{(metrics.conversionRate * 100).toFixed(2)}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">${metrics.averageOrderValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>A/B Testing</Typography>
        <ABTestManager />
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Marketing Campaigns</Typography>
        <MarketingCampaigns />
      </Box>
    </Box>
  );
};

export default MarketingDashboard;
