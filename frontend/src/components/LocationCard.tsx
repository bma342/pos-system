import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Location } from '../types/locationTypes';

interface LocationCardProps {
  location: Location;
  onSelect: (location: Location) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {location.name}
        </Typography>
        <Typography color="text.secondary">{location.address}</Typography>
        <Typography variant="body2">{location.phoneNumber}</Typography>
        <Button onClick={() => onSelect(location)}>Select</Button>
      </CardContent>
    </Card>
  );
};

LocationCard.displayName = 'LocationCard';

export default LocationCard;
