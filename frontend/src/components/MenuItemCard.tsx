import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { MenuItem } from '../types/menuTypes';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  return (
    <Card 
      sx={{ 
        backgroundColor: 'var(--card-background)',
        boxShadow: 'var(--card-shadow)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={item.imageUrl}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6" color="var(--primary-color)">
          ${item.price.toFixed(2)}
        </Typography>
        <Button 
          onClick={onSelect}
          variant="contained" 
          color="primary"
          sx={{ marginTop: 2 }}
          aria-label={`Select ${item.name}`}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
