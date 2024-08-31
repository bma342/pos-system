import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { LocationService } from '../../services/LocationService';
import { Location } from '../../types/locationTypes';

const ExecutiveDashboard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(0);
  const [topSellingItems, setTopSellingItems] = useState<string[]>([]);

  const clientId = useSelector(
    (state: RootState) => state.client.currentClient?.id
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (clientId) {
        const locationService = new LocationService();
        const fetchedLocations =
          await locationService.getClientLocations(clientId);
        setLocations(fetchedLocations);

        // Fetch and set other dashboard data
        // This is a placeholder for actual API calls
        setTotalRevenue(1000000);
        setTotalOrders(5000);
        setAverageOrderValue(200);
        setTopSellingItems(['Item 1', 'Item 2', 'Item 3']);
      }
    };

    fetchDashboardData();
  }, [clientId]);

  return (
    <div className="executive-dashboard">
      <Typography variant="h4" gutterBottom>
        Executive Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">
              ${totalRevenue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{totalOrders.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">
              ${averageOrderValue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Locations</Typography>
            <Typography variant="h4">{locations.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Top Selling Items</Typography>
            <ul>
              {topSellingItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExecutiveDashboard;
