import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchDashboardData } from '../redux/slices/dashboardSlice';
import { selectCurrentUser, selectSelectedLocation } from '../redux/slices/userSlice';
import { CircularProgress, Grid, Paper, Typography, Button, Tabs, Tab, Box } from '@mui/material';
import { DateRange, DashboardParams, DashboardData, ChartData, LocationComparisonData } from '../types/dashboardTypes';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocationSelector from '../components/LocationSelector';

const LazyBarChart = lazy(() => import('../components/LazyBarChart'));
const LazyLocationComparisonChart = lazy(() => import('../components/LazyLocationComparisonChart'));

const ReportingDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);
  const user = useSelector(selectCurrentUser);
  const selectedLocation = useSelector(selectSelectedLocation);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [activeTab, setActiveTab] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate && user?.clientId && selectedLocation) {
      const params: DashboardParams = {
        dateRange,
        clientId: user.clientId,
        locationId: selectedLocation,
      };
      dispatch(fetchDashboardData(params));
    }
  }, [dispatch, dateRange, user, selectedLocation]);

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleRefresh = () => {
    if (dateRange.startDate && dateRange.endDate && user?.clientId && selectedLocation) {
      const params: DashboardParams = {
        dateRange,
        clientId: user.clientId,
        locationId: selectedLocation,
      };
      dispatch(fetchDashboardData(params));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>No data available</Typography>;

  return (
    <Box className="reporting-dashboard">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          value={[dateRange.startDate, dateRange.endDate]}
          onChange={(newValue: [Date | null, Date | null]) => 
            handleDateRangeChange({ startDate: newValue[0], endDate: newValue[1] })
          }
        />
      </LocalizationProvider>
      <Button onClick={handleRefresh} variant="contained" color="primary">Refresh Data</Button>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{data?.totalOrders ?? 'N/A'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${data?.totalRevenue?.toFixed(2) ?? 'N/A'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Avg. Order Value</Typography>
            <Typography variant="h4">${data?.averageOrderValue?.toFixed(2) ?? 'N/A'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Customer Retention</Typography>
            <Typography variant="h4">{data?.customerRetentionRate ? `${data?.customerRetentionRate}%` : 'N/A'}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mt: 2 }}>
        <Tab label="Revenue" />
        <Tab label="Order Trends" />
        <Tab label="Menu Performance" />
        <Tab label="Customer Insights" />
      </Tabs>

      <Suspense fallback={<CircularProgress />}>
        {activeTab === 0 && data?.revenueOverTime && <LazyBarChart data={data.revenueOverTime} title="Revenue Over Time" />}
        {activeTab === 1 && data?.orderTrends && <LazyBarChart data={data.orderTrends} title="Order Trends" />}
        {activeTab === 2 && data?.menuPerformance && <LazyBarChart data={data.menuPerformance} title="Menu Performance" />}
        {activeTab === 3 && data?.customerInsights && <LazyBarChart data={data.customerInsights} title="Customer Insights" />}
      </Suspense>

      <Button onClick={() => setShowComparison(!showComparison)} variant="outlined" color="primary" sx={{ mt: 2 }}>
        {showComparison ? "Hide Comparison" : "Compare Locations"}
      </Button>

      {showComparison && data?.locationComparison && (
        <Suspense fallback={<CircularProgress />}>
          <LazyLocationComparisonChart data={data.locationComparison} />
        </Suspense>
      )}
    </Box>
  );
};

export default ReportingDashboard;