import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../redux/slices/menuItemsSlice';
import { AppDispatch, RootState } from '../redux/store';
import MenuItemCard from '../components/MenuItemCard';
import { MenuItem } from '../types/menuTypes';

const Menu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector((state: RootState) => state.menuItems.items);
  const status = useSelector((state: RootState) => state.menuItems.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [status, dispatch]);

  const handleAddToCart = (item: MenuItem) => {
    // Implement add to cart logic
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="menu-items-grid">
        {menuItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Menu;