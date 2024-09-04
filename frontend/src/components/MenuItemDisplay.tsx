import React, { useState, KeyboardEvent } from 'react';
import { Typography, Box, Button, Collapse, Paper } from '@mui/material';
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
    <Paper
      elevation={3}
      sx={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '16px',
        marginBottom: '16px',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
      }}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h6" color="primary">${item.price.toFixed(2)}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">{item.description}</Typography>
      <Collapse in={expanded}>
        <Box mt={2}>
          {item.calories && (
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
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default MenuItemDisplay;
