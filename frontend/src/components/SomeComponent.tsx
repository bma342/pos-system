import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/variables.css';

const SomeComponent: React.FC = () => {
  return (
    <Box sx={{ 
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-color)',
      fontFamily: 'var(--font-family)'
    }}>
      <Typography variant="h5" sx={{ color: 'var(--primary-color)' }}>
        Some Heading
      </Typography>
      {/* Rest of the component */}
    </Box>
  );
};

export default SomeComponent;