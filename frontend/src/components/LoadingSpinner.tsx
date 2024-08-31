import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </div>
);

export default LoadingSpinner;
