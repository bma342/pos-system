import React from 'react';
import { MenuItem } from '../types/menuTypes';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item-card" role="article">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p aria-label={`Price: $${item.price.toFixed(2)}`}>${item.price.toFixed(2)}</p>
      <button 
        onClick={() => onAddToCart(item)}
        aria-label={`Add ${item.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItemCard;