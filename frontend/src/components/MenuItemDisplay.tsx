import React, { useState, KeyboardEvent } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { MenuItem } from '../types/menuTypes';

interface MenuItemDisplayProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemDisplay: React.FC<MenuItemDisplayProps> = ({
  item,
  onAddToCart,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleExpanded();
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '16px',
        marginBottom: '16px',
        cursor: 'pointer',
      }}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <Typography variant="h6">{item.name}</Typography>
      <Typography>{item.description}</Typography>
      <Typography variant="h6">${item.price.toFixed(2)}</Typography>
      {expanded && (
        <Box mt={2}>
          <Typography variant="body2">Calories: {item.calories}</Typography>
          <Typography variant="body2">
            Allergens: {item.allergens.join(', ')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
          >
            Add to Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MenuItemDisplay;
