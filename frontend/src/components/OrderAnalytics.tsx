import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAnalytics } from '../redux/slices/analyticsSlice';
import { Line } from 'react-chartjs-2';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth'; // Add this import

const OrderAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const analytics = useSelector((state: RootState) => state.analytics);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Add this line

  useEffect(() => {
    if (user?.clientId) { // Add this check
      dispatch(fetchAnalytics(user.clientId))
        .then(() => setLoading(false))
        .catch((error: Error) => {
          console.error('Error fetching analytics:', error);
          setLoading(false);
        });
    }
  }, [dispatch, user]); // Add user to dependency array

  if (loading) {
    return <CircularProgress />;
  }

  const chartData = {
    labels: analytics.analyticsData?.labels || [],
    datasets: [
      {
        label: 'Order Count',
        data: analytics.analyticsData?.orderCounts || [],
        // ... rest of the dataset config
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h5">Order Analytics</Typography>
      <Line data={chartData} />
    </Box>
  );
};

export default OrderAnalytics;