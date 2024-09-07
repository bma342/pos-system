import React, { useEffect, useState, useCallback } from 'react';
import { createMenu, updateMenu, deleteMenu, getMenus } from '../api/menuApi';
import { useParams } from 'react-router-dom';
import { Menu } from '../types';

const AdminMenuManagement: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [menuId, setMenuId] = useState<number>(0);
  const [menuData, setMenuData] = useState<Partial<Menu>>({});
  const [updatedMenu, setUpdatedMenu] = useState<Partial<Menu>>({});
  const [menus, setMenus] = useState<Menu[]>([]);

  const loadMenus = useCallback(async () => {
    if (clientId) {
      const loadedMenus = await getMenus(clientId);
      setMenus(loadedMenus);
    }
  }, [clientId]);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  const handleCreateMenu = async () => {
    if (clientId && menuData.name) {
      await createMenu(clientId, menuData);
      loadMenus();
      setMenuData({});
    }
  };

  const handleUpdateMenu = async () => {
    if (clientId && menuId && updatedMenu) {
      await updateMenu(clientId, menuId.toString(), updatedMenu);
      loadMenus();
      setUpdatedMenu({});
    }
  };

  const handleDeleteMenu = async () => {
    if (clientId && menuId) {
      await deleteMenu(Number(clientId), menuId);
      loadMenus();
      setMenuId(0);
    }
  };

  return (
    <div>
      <h2>Menu Management</h2>
      <div>
        <h3>Create New Menu</h3>
        <input
          type="text"
          placeholder="Menu Name"
          value={menuData.name || ''}
          onChange={(e) => setMenuData({ ...menuData, name: e.target.value })}
        />
        <button onClick={handleCreateMenu}>Create Menu</button>
      </div>
      <div>
        <h3>Update Menu</h3>
        <select
          value={menuId}
          onChange={(e) => setMenuId(Number(e.target.value))}
        >
          <option value={0}>Select a menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New Menu Name"
          value={updatedMenu.name || ''}
          onChange={(e) =>
            setUpdatedMenu({ ...updatedMenu, name: e.target.value })
          }
        />
        <button onClick={handleUpdateMenu}>Update Menu</button>
      </div>
      <div>
        <h3>Delete Menu</h3>
        <select
          value={menuId}
          onChange={(e) => setMenuId(Number(e.target.value))}
        >
          <option value={0}>Select a menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteMenu}>Delete Menu</button>
      </div>
    </div>
  );
};

export default AdminMenuManagement;
