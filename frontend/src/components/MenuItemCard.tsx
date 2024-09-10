import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { MenuItem } from '../types/menuTypes';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3">{item.name}</Typography>
        <Typography variant="body2" color="textSecondary" aria-label="Item description">
          {item.description}
        </Typography>
        <Typography variant="h6" color="primary" aria-label="Item price">
          ${item.price.toFixed(2)}
        </Typography>
        <Button 
          onClick={() => onSelect(item)} 
          aria-label={`Select ${item.name}`}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
