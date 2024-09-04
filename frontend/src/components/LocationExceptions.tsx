import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface LocationExceptionsProps {
  locationId: number;
}

const LocationExceptions: React.FC<LocationExceptionsProps> = ({
  locationId,
}) => {
  const menuItems = useSelector((state: RootState) =>
    state.menuItems.items.filter(
      (item) => item.locationId === locationId && item.prepTime > 0
    )
  );

  return (
    <div>
      <Typography variant="h6">Exceptions</Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Prep Time: ${item.prepTime} minutes`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LocationExceptions;
