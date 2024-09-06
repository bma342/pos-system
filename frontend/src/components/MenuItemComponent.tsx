import React, { useState } from 'react';
import { MenuItem, Modifier } from '../types/menuTypes';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

interface Props {
  item: MenuItem;
  onAddToCart: (quantity: number, modifiers: Modifier[]) => void;
}

const MenuItemComponent: React.FC<Props> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<Modifier[]>([]);

  const handleModifierToggle = (modifier: Modifier) => {
    setSelectedModifiers(prev => 
      prev.some(m => m.id === modifier.id)
        ? prev.filter(m => m.id !== modifier.id)
        : [...prev, modifier]
    );
  };

  const handleAddToCart = () => {
    onAddToCart(quantity, selectedModifiers);
    setQuantity(1);
    setSelectedModifiers([]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          inputProps={{ min: 1 }}
          sx={{ mt: 2, mb: 2 }}
        />
        {item.modifiers.length > 0 && (
          <>
            <Typography variant="subtitle1" gutterBottom>Modifiers:</Typography>
            <List>
              {item.modifiers.map((modifier) => (
                <ListItem key={modifier.id} dense button onClick={() => handleModifierToggle(modifier)}>
                  <ListItemText 
                    primary={modifier.name} 
                    secondary={`+$${modifier.price.toFixed(2)}`} 
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemComponent;
