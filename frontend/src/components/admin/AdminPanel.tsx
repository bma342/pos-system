import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ExecutiveDashboard from './ExecutiveDashboard';
import LocationManager from './LocationManager';
import MenuManager from './MenuManager';
import OrderManager from './OrderManager';
import ReviewManager from './ReviewManager';
import UserManager from './UserManager';
import SettingsManager from './SettingsManager';

const AdminPanel: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!user || !user.roles.includes('clientAdmin')) {
    return <Typography>Access Denied</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Admin Panel</Typography>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Dashboard" />
        <Tab label="Locations" />
        <Tab label="Menu" />
        <Tab label="Orders" />
        <Tab label="Reviews" />
        <Tab label="Users" />
        <Tab label="Settings" />
      </Tabs>
      {currentTab === 0 && <ExecutiveDashboard />}
      {currentTab === 1 && <LocationManager />}
      {currentTab === 2 && <MenuManager />}
      {currentTab === 3 && <OrderManager />}
      {currentTab === 4 && <ReviewManager />}
      {currentTab === 5 && <UserManager />}
      {currentTab === 6 && <SettingsManager />}
    </Box>
  );
};

export default AdminPanel;
