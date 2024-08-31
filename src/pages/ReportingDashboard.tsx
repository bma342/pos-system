import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';
import { fetchRevenueData } from '../redux/slices/revenueSlice';
import { fetchOrderData } from '../redux/slices/orderSlice';
import { RootState, AppDispatch } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
import { handleError } from '../utils/errorHandler';

const LazyBarChart = lazy(() => import('../components/LazyBarChart'));
const LazyLineChart = lazy(() => import('../components/LazyLineChart'));

const ReportingDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const revenueData = useSelector((state: RootState) => state.revenue.data);
  const orderData = useSelector((state: RootState) => state.order.data);
  const revenueStatus = useSelector((state: RootState) => state.revenue.status);
  const orderStatus = useSelector((state: RootState) => state.order.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchRevenueData());
        await dispatch(fetchOrderData());
      } catch (error) {
        handleError(error);
      }
    };

    if (revenueStatus === 'idle' && orderStatus === 'idle') {
      fetchData();
    }
  }, [dispatch, revenueStatus, orderStatus]);

  const orderChartData = {
    labels: orderData.map((data) => data.date),
    datasets: [
      {
        label: 'Orders',
        data: orderData.map((data) => data.orders),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const revenueChartData = {
    labels: revenueData.map((data) => data.date),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map((data) => data.revenue),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const isLoading = revenueStatus === 'loading' || orderStatus === 'loading';
  const isError = revenueStatus === 'failed' || orderStatus === 'failed';

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress aria-label="Loading dashboard data" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center">
        An error occurred while loading the dashboard. Please try again later.
      </Typography>
    );
  }

  return (
    <ErrorBoundary>
      <Box sx={{ flexGrow: 1, p: 3 }} role="main" aria-label="Reporting Dashboard">
        <Typography variant="h4" gutterBottom component="h1">
          Reporting Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }} elevation={3}>
              <Typography variant="h6" gutterBottom component="h2">
                Order Trends
              </Typography>
              <Suspense fallback={<CircularProgress aria-label="Loading order chart" />}>
                <LazyBarChart data={orderChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }} elevation={3}>
              <Typography variant="h6" gutterBottom component="h2">
                Revenue Trends
              </Typography>
              <Suspense fallback={<CircularProgress aria-label="Loading revenue chart" />}>
                <LazyLineChart data={revenueChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Suspense>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ErrorBoundary>
  );
};

export default ReportingDashboard;