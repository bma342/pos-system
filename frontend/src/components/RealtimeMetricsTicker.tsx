import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const RealtimeMetricsTicker: React.FC = () => {
  const realtimeMetrics = useSelector(
    (state: RootState) => state.realtimeMetrics
  );
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetricIndex(
        (prevIndex) => (prevIndex + 1) % Object.keys(realtimeMetrics).length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [realtimeMetrics]);

  const currentMetric = Object.entries(realtimeMetrics)[currentMetricIndex];

  return (
    <Box>
      <Typography variant="h6">Real-time Metrics</Typography>
      {currentMetric && (
        <Typography>
          {currentMetric[0]}: {currentMetric[1]}
        </Typography>
      )}
      <Typography variant="caption">
        Data updates every 5 seconds. Don&apos;t see what you&apos;re looking
        for? Check the dashboard for more metrics.
      </Typography>
    </Box>
  );
};

export default RealtimeMetricsTicker;
