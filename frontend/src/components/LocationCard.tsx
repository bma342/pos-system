import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Location } from '../types/locationTypes';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {location.name}
        </Typography>
        <Typography color="text.secondary">
          {location.address}
        </Typography>
        {location.city && (
          <Typography color="text.secondary">
            {location.city}, {location.state} {location.zipCode}
          </Typography>
        )}
        {location.phoneNumber && (
          <Typography color="text.secondary">
            Phone: {location.phoneNumber}
          </Typography>
        )}
        {location.isDropoffSite && (
          <Box mt={1}>
            <Typography color="primary">Dropoff Site Available</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationCard;
