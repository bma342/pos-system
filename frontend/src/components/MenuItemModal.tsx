import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem, Modifier } from '../types';
import { addToCart } from '../redux/slices/cartSlice';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

const MenuItemModal: React.FC<Props> = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const [selectedModifiers, setSelectedModifiers] = useState<Modifier[]>(
    item.defaultModifiers || []
  );
  const [quantity, setQuantity] = useState(1);

  const toggleModifier = (modifier: Modifier) => {
    if (selectedModifiers.some((m) => m.id === modifier.id)) {
      setSelectedModifiers(
        selectedModifiers.filter((m) => m.id !== modifier.id)
      );
    } else {
      setSelectedModifiers([...selectedModifiers, modifier]);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        menuItem: item,
        quantity,
        selectedModifiers,
      })
    );
    onClose();
  };

  return (
    <div className="menu-item-modal">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
      {item.reviewsEnabled && (
        <p>
          Rating: {item.averageRating} ({item.reviewCount} reviews)
        </p>
      )}
      {item.showQuantityAvailable && <p>Available: {item.quantityAvailable}</p>}
      <h3>Modifiers</h3>
      {item.modifiers.map((modifier) => (
        <div key={modifier.id} className="modifier-option">
          <input
            type="checkbox"
            id={`modifier-${modifier.id}`}
            checked={selectedModifiers.some((m) => m.id === modifier.id)}
            onChange={() => toggleModifier(modifier)}
          />
          <label htmlFor={`modifier-${modifier.id}`}>{modifier.name}</label>
        </div>
      ))}
      <div className="quantity-selector">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default MenuItemModal;
