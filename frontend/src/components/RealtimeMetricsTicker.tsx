import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchRealtimeMetrics } from '../redux/slices/realtimeMetricsSlice';

const RealtimeMetricsTicker: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const realtimeMetrics = useSelector((state: RootState) => state.realtimeMetrics.metrics);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  useEffect(() => {
    const fetchMetrics = () => {
      dispatch(fetchRealtimeMetrics());
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const rotateMetrics = setInterval(() => {
      setCurrentMetricIndex((prevIndex) => (prevIndex + 1) % Object.keys(realtimeMetrics).length);
    }, 5000);

    return () => clearInterval(rotateMetrics);
  }, [realtimeMetrics]);

  const currentMetric = Object.entries(realtimeMetrics)[currentMetricIndex];

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6">Real-time Metrics</Typography>
        {currentMetric && (
          <Typography variant="h5">
            {currentMetric[0]}: {currentMetric[1]}
          </Typography>
        )}
        <Typography variant="caption">
          Data updates every minute. Metric rotates every 5 seconds. Check the dashboard for more metrics.
        </Typography>
      </Box>
    </Paper>
  );
};

export default RealtimeMetricsTicker;
