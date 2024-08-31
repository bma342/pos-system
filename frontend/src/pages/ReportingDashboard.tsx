import React, { lazy, Suspense } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';

const LazyBarChart = lazy(() => import('../components/LazyBarChart'));
const LazyLineChart = lazy(() => import('../components/LazyLineChart'));

const mockOrderData = [
  { name: 'Jan', orders: 400 },
  { name: 'Feb', orders: 300 },
  { name: 'Mar', orders: 500 },
  { name: 'Apr', orders: 280 },
  { name: 'May', orders: 590 },
  { name: 'Jun', orders: 800 },
];

const mockRevenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2800 },
  { name: 'May', revenue: 5900 },
  { name: 'Jun', revenue: 8000 },
];

const ReportingDashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Monthly Orders</Typography>
            <Suspense fallback={<CircularProgress />}>
              <LazyBarChart data={mockOrderData} dataKey="orders" />
            </Suspense>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Monthly Revenue</Typography>
            <Suspense fallback={<CircularProgress />}>
              <LazyLineChart data={mockRevenueData} dataKey="revenue" />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportingDashboard;
