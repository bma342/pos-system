import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenus } from '../redux/slices/menuSlice';
import { useClientContext } from '../context/ClientContext';
import { Menu as MenuType, MenuGroup, MenuItem } from '../types';

const MenuPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector((state: RootState) => state.menu.menus);
  const { clientId, isLoading, error } = useClientContext();

  useEffect(() => {
    if (clientId) {
      dispatch(fetchMenus(clientId));
    }
  }, [dispatch, clientId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clientId) return <div>No client ID available</div>;

  return (
    <div>
      <h2>Menu</h2>
      {menus.map((menu: MenuType) => (
        <div key={menu.id}>
          <h3>{menu.name}</h3>
          <ul>
            {menu.groups.map((group: MenuGroup) => (
              <li key={group.id}>
                <h4>{group.name}</h4>
                <ul>
                  {group.items.map((item: MenuItem) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
