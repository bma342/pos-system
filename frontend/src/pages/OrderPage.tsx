import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenu, selectMenu } from '../redux/slices/menuSlice';
import { addToCart, removeFromCart, updateCartItemQuantity, selectCartItems } from '../redux/slices/cartSlice';
import { Menu, MenuGroup, MenuItem, Modifier, CartItem } from '../types/menuTypes';
import { useSelectedLocation } from '../hooks/useSelectedLocation';

const OrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const menu = useSelector((state: RootState) => selectMenu(state));
  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, Record<string, Modifier>>>({});
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchMenu(selectedLocation));
    }
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    if (menu && menu.menuGroups.length > 0) {
      setActiveGroup(menu.menuGroups[0].id);
    }
  }, [menu]);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

  const handleModifierSelection = (itemId: string, modifier: Modifier) => {
    setSelectedModifiers(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [modifier.id]: modifier
      }
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = itemQuantities[item.id] || 1;
    dispatch(addToCart({
      menuItem: {
        id: item.id,
        name: item.name,
        price: item.price
      },
      quantity: quantity,
      selectedModifiers: Object.values(selectedModifiers[item.id] || {})
    }));
    setItemQuantities(prev => ({ ...prev, [item.id]: 1 }));
    setSelectedModifiers(prev => ({ ...prev, [item.id]: {} }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    dispatch(updateCartItemQuantity({ id: itemId, quantity }));
  };

  const getEffectivePrice = (item: MenuItem | Modifier) => {
    return item.localOverrides?.price ?? item.price;
  };

  const getEffectiveName = (item: MenuItem | Modifier) => {
    return item.localOverrides?.name ?? item.name;
  };

  const isItemAvailable = (item: MenuItem) => {
    return item.localOverrides?.isAvailable ?? item.isAvailable;
  };

  if (!menu) return <div>Loading menu...</div>;

  return (
    <div className="order-page">
      <h1>Order Page for {selectedLocation?.name}</h1>
      
      <div className="menu-navigation">
        {menu.menuGroups.map((group: MenuGroup) => (
          <button 
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={activeGroup === group.id ? 'active' : ''}
          >
            {group.name}
          </button>
        ))}
      </div>

      <div className="menu-container">
        {menu.menuGroups
          .filter((group: MenuGroup) => activeGroup === group.id)
          .map((group: MenuGroup) => (
          <div key={group.id} className="menu-group">
            <h2>{group.name}</h2>
            {group.items.map((item: MenuItem) => (
              <div key={item.id} className="menu-item">
                <h3>{getEffectiveName(item)} - ${getEffectivePrice(item).toFixed(2)}</h3>
                <p>{item.description}</p>
                {isItemAvailable(item) ? (
                  <>
                    <input 
                      type="number" 
                      value={itemQuantities[item.id] || 1} 
                      onChange={(e) => handleQuantityChange(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    {item.modifiers && item.modifiers.map(modifier => (
                      <label key={modifier.id}>
                        <input
                          type="checkbox"
                          onChange={() => handleModifierSelection(item.id, modifier)}
                          checked={!!selectedModifiers[item.id]?.[modifier.id]}
                        />
                        {getEffectiveName(modifier)} (+${getEffectivePrice(modifier).toFixed(2)})
                      </label>
                    ))}
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  </>
                ) : (
                  <p>Currently unavailable</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="cart-container">
        <h2>Cart</h2>
        {cartItems.map((cartItem: CartItem) => (
          <div key={cartItem.menuItem.id} className="cart-item">
            <h3>{cartItem.menuItem.name}</h3>
            <p>Price: ${cartItem.menuItem.price.toFixed(2)}</p>
            <p>Quantity: 
              <input 
                type="number" 
                value={cartItem.quantity} 
                onChange={(e) => handleUpdateCartQuantity(cartItem.menuItem.id, Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </p>
            {cartItem.selectedModifiers.length > 0 && (
              <div>
                <h4>Selected Modifiers:</h4>
                <ul>
                  {cartItem.selectedModifiers.map((modifier) => (
                    <li key={modifier.id}>{modifier.name} (+${modifier.price.toFixed(2)})</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => handleRemoveFromCart(cartItem.menuItem.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;