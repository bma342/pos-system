import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateMenu } from '../redux/slices/menuSlice';
import { Menu, MenuGroup, MenuItem } from '../types/menuTypes';

interface MenuGroupComponentProps {
  menu: Menu;
  group: MenuGroup;
}

const MenuGroupComponent: React.FC<MenuGroupComponentProps> = ({ menu, group }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = (newItem: Omit<MenuItem, 'id' | 'isModified'>) => {
    const updatedGroup = {
      ...group,
      items: [...group.items, { ...newItem, id: Date.now().toString(), isModified: true }],
      isModified: true,
    };
    const updatedMenu = {
      ...menu,
      groups: menu.groups.map((g: MenuGroup) => g.id === group.id ? updatedGroup : g),
      isModified: true,
    };
    dispatch(updateMenu({
      locationId: menu.locationId,
      menuId: menu.id,
      menuData: updatedMenu,
    }));
  };

  const handleUpdateItem = (updatedItem: MenuItem) => {
    const updatedGroup = {
      ...group,
      items: group.items.map((item: MenuItem) => 
        item.id === updatedItem.id ? { ...updatedItem, isModified: true } : item
      ),
      isModified: true,
    };
    const updatedMenu = {
      ...menu,
      groups: menu.groups.map((g: MenuGroup) => g.id === group.id ? updatedGroup : g),
      isModified: true,
    };
    dispatch(updateMenu({
      locationId: menu.locationId,
      menuId: menu.id,
      menuData: updatedMenu,
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedGroup = {
      ...group,
      items: group.items.filter((item: MenuItem) => item.id !== itemId),
      isModified: true,
    };
    const updatedMenu = {
      ...menu,
      groups: menu.groups.map((g: MenuGroup) => g.id === group.id ? updatedGroup : g),
      isModified: true,
    };
    dispatch(updateMenu({
      locationId: menu.locationId,
      menuId: menu.id,
      menuData: updatedMenu,
    }));
  };

  return (
    <div>
      <h2>{group.name}</h2>
      {group.items.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price}</span>
          {item.isModified && <span> (Modified)</span>}
          <button onClick={() => handleUpdateItem({ ...item, price: item.price + 1 })}>
            Increase Price
          </button>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={() => handleAddItem({ name: 'New Item', price: 9.99 })}>
        Add New Item
      </button>
    </div>
  );
};

export default MenuGroupComponent;
