import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MenuService } from '../services/MenuService';
import { useAuth } from '../contexts/AuthContext';
import { Menu, MenuGroup, MenuItem, Modifier } from '../types/menuTypes';

// ... (other imports)

interface SelectedItem {
  id: string;
  parentId?: string;
  type: 'menu' | 'group' | 'item' | 'modifier';
}

const MenuManagementAdmin: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { user } = useAuth();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [modalType, setModalType] = useState<'menu' | 'group' | 'item' | 'modifier' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const menuService = new MenuService();

  useEffect(() => {
    fetchMenus();
  }, [clientId]);

  const fetchMenus = async () => {
    if (clientId) {
      const fetchedMenus = await menuService.getMenus(clientId);
      setMenus(fetchedMenus);
    }
  };

  const handleSave = async (formData: any) => {
    setIsSaving(true);
    try {
      let result: Menu | MenuGroup | MenuItem | Modifier;
      switch (modalType) {
        case 'menu':
          result = await menuService.updateMenu(
            clientId,
            selectedItem?.id || '',
            formData
          );
          setMenus(menus.map((m) => (m.id === result.id ? result as Menu : m)));
          break;
        case 'group':
          if (selectedItem?.parentId) {
            result = await menuService.updateMenuGroup(
              clientId,
              selectedItem.parentId,
              selectedItem.id,
              formData
            );
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.parentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === result.id ? result as MenuGroup : g
                      ),
                    }
                  : m
              )
            );
          }
          break;
        case 'item':
          if (selectedItem?.parentId) {
            result = await menuService.updateMenuItem(
              clientId,
              selectedItem.parentId,
              selectedItem.id,
              formData
            );
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.parentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === selectedItem.parentId
                          ? {
                              ...g,
                              items: g.items.map((i) =>
                                i.id === result.id ? result as MenuItem : i
                              ),
                            }
                          : g
                      ),
                    }
                  : m
              )
            );
          }
          break;
        case 'modifier':
          if (selectedItem?.parentId) {
            result = await menuService.updateModifier(
              clientId,
              selectedItem.parentId,
              selectedItem.id,
              formData
            );
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.parentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === selectedItem.parentId
                          ? {
                              ...g,
                              items: g.items.map((i) =>
                                i.id === selectedItem.parentId
                                  ? {
                                      ...i,
                                      modifiers: i.modifiers.map((mod) =>
                                        mod.id === result.id ? result as Modifier : mod
                                      ),
                                    }
                                  : i
                              ),
                            }
                          : g
                      ),
                    }
                  : m
              )
            );
          }
          break;
      }
      setModalType(null);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // ... (rest of the component code)

  return (
    // ... (JSX for rendering the component)
  );
};

export default MenuManagementAdmin;