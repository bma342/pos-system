import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMenu } from '../redux/slices/menuSlice';
import { Menu, MenuGroup, MenuItem } from '../types/menuTypes';
import { MenuService } from '../services/menuService';
import MenuItemCard from '../components/MenuItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MenuPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const dispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu.currentMenu);
  const loading = useSelector((state: RootState) => state.menu.loading);
  const error = useSelector((state: RootState) => state.menu.error);
  const [menuStatistics, setMenuStatistics] = useState<MenuService.MenuStatistics | null>(null);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchMenu(clientId));
      MenuService.getMenuStatistics(clientId)
        .then(stats => setMenuStatistics(stats))
        .catch(err => console.error('Failed to fetch menu statistics:', err));
    }
  }, [clientId, dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!menu) return <ErrorMessage message="Menu not found" />;

  return (
    <div className="menu-page">
      <h1>{menu.name}</h1>
      {menuStatistics && (
        <div className="menu-statistics">
          <p>Total Items: {menuStatistics.totalItems}</p>
          <h3>Most Popular Items:</h3>
          <ul>
            {menuStatistics.mostPopularItems.map((item) => (
              <li key={item.name}>{item.name} - Ordered {item.orderCount} times</li>
            ))}
          </ul>
        </div>
      )}
      {menu.menuGroups.map((group: MenuGroup) => (
        <div key={group.id} className="menu-group">
          <h2>{group.name}</h2>
          <div className="menu-items">
            {group.items.map((item: MenuItem) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
