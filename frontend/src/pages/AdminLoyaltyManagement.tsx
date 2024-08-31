import React from 'react';
import { Typography, Tabs, Tab, Box } from '@mui/material';
import LoyaltyRewards from '../components/LoyaltyRewards';
import LoyaltyTiers from '../components/LoyaltyTiers';

const AdminLoyaltyManagement: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loyalty Program Management
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Rewards" />
        <Tab label="Tiers" />
      </Tabs>
      {tabValue === 0 && <LoyaltyRewards />}
      {tabValue === 1 && <LoyaltyTiers />}
    </Box>
  );
};

export default AdminLoyaltyManagement;
