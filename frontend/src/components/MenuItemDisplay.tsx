import React from 'react';
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { MenuItem } from '../types/menuTypes';

interface MenuItemDisplayProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

const MenuItemDisplay: React.FC<MenuItemDisplayProps> = ({ item, onAddToCart }) => {
  return (
    <Card>
      {item.imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={item.imageUrl}
          alt={item.name}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6">
          ${item.price.toFixed(2)}
        </Typography>
        {item.modifiers && item.modifiers.length > 0 && (
          <Typography variant="body2">
            Modifiers: {item.modifiers.map(mod => mod.name).join(', ')}
          </Typography>
        )}
        {item.defaultModifiers && item.defaultModifiers.length > 0 && (
          <Typography variant="body2">
            Default Modifiers: {item.defaultModifiers.map(mod => mod.name).join(', ')}
          </Typography>
        )}
        {item.reviewsEnabled && item.averageRating !== undefined && (
          <Typography variant="body2">
            Average Rating: {item.averageRating.toFixed(1)} ({item.reviewCount} reviews)
          </Typography>
        )}
        {item.showQuantityAvailable && item.quantityAvailable !== undefined && (
          <Typography variant="body2">
            Available: {item.quantityAvailable}
          </Typography>
        )}
        <Typography variant="body2">
          Available: {item.isAvailable ? 'Yes' : 'No'}
        </Typography>
        {item.calories !== undefined && (
          <Typography variant="body2">Calories: {item.calories}</Typography>
        )}
        {item.allergens && item.allergens.length > 0 && (
          <Typography variant="body2">
            Allergens: {item.allergens.join(', ')}
          </Typography>
        )}
        {item.nutritionalInfo && (
          <Typography variant="body2">
            Nutritional Info: {item.nutritionalInfo}
          </Typography>
        )}
        {onAddToCart && (
          <Button onClick={() => onAddToCart(item)} variant="contained" color="primary">
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemDisplay;
