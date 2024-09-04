import React from 'react';
import { InventoryItem } from '../types/inventoryTypes';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

interface Props {
  items: InventoryItem[];
}

const InventoryAlerts: React.FC<Props> = ({ items }) => {
  const outOfStockItems = items.filter(item => item.quantity <= 0);
  const lowStockItems = items.filter(item => item.quantity > 0 && item.quantity <= item.lowStockThreshold);

  return (
    <Box className="inventory-alerts">
      <Typography variant="h4">Inventory Alerts</Typography>
      <Box>
        <Typography variant="h5">Out of Stock Items</Typography>
        {outOfStockItems.length === 0 ? (
          <Typography>No items are currently out of stock.</Typography>
        ) : (
          <List>
            {outOfStockItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Out of stock for ${item.outOfStockDuration} hours`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box>
        <Typography variant="h5">Low Stock Items</Typography>
        {lowStockItems.length === 0 ? (
          <Typography>No items are currently low in stock.</Typography>
        ) : (
          <List>
            {lowStockItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Current quantity: ${item.quantity}, Low stock threshold: ${item.lowStockThreshold}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default InventoryAlerts;
