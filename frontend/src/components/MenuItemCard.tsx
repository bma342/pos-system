import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { MenuItem } from '../types/menuTypes';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect(item);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        m: 2, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={item.image || '/placeholder-image.jpg'}
        alt={item.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${item.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelect(item)}
          onKeyPress={handleKeyPress}
          fullWidth
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default MenuItemCard;
