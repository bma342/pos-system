import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Modal,
  TextField,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  FormControlLabel,
  List,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { useParams } from 'react-router-dom';
import { MenuService } from '../services/menuService';
import { useAuth } from '../contexts/AuthContext';
import { Menu, MenuGroup, MenuItem, Modifier } from '../types/menuTypes';

interface SelectedItem {
  id: number;
  name: string;
  parentId?: number;
  grandParentId?: number;
  price?: number;
  description?: string;
  isAvailable?: boolean;
  menuId?: number;
  groupId?: number;
  itemId?: number;
}

const MenuManagementAdmin: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    'menu' | 'group' | 'item' | 'modifier'
  >('menu');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);

  const { clientId } = useParams<{ clientId: string }>();
  const { user } = useAuth();

  const menuService = useMemo(() => new MenuService(), []);

  const loadMenus = useCallback(async () => {
    if (!clientId) return;
    try {
      const fetchedMenus = await menuService.getAllMenus(clientId);
      setMenus(fetchedMenus);
      setLoading(false);
    } catch (err) {
      setError('Failed to load menus. Please try again.');
      setLoading(false);
    }
  }, [clientId, menuService]);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = menus.filter(
      (menu) =>
        menu.name.toLowerCase().includes(query) ||
        menu.menuGroups.some(
          (group) =>
            group.name.toLowerCase().includes(query) ||
            group.items.some((item) => item.name.toLowerCase().includes(query))
        )
    );
    setFilteredMenus(filtered);
  };

  const handleSave = async () => {
    if (!selectedItem || !clientId) return;
    setIsSaving(true);
    try {
      let result: Menu | MenuGroup | MenuItem;
      switch (modalType) {
        case 'menu':
          result =
            selectedItem.id === 0
              ? await menuService.createMenu(clientId, selectedItem)
              : await menuService.updateMenu(
                  clientId,
                  selectedItem.id,
                  selectedItem
                );
          setMenus(menus.map((m) => (m.id === result.id ? result : m)));
          break;
        case 'group':
          if (selectedItem.parentId) {
            result =
              selectedItem.id === 0
                ? await menuService.createMenuGroup(
                    clientId,
                    selectedItem.parentId,
                    selectedItem
                  )
                : await menuService.updateMenuGroup(
                    clientId,
                    selectedItem.parentId,
                    selectedItem.id,
                    selectedItem
                  );
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.parentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === result.id ? result : g
                      ),
                    }
                  : m
              )
            );
          }
          break;
        case 'item':
          if (selectedItem.grandParentId && selectedItem.parentId) {
            result =
              selectedItem.id === 0
                ? await menuService.createMenuItem(
                    clientId,
                    selectedItem.grandParentId,
                    selectedItem.parentId,
                    selectedItem
                  )
                : await menuService.updateMenuItem(
                    clientId,
                    selectedItem.grandParentId,
                    selectedItem.parentId,
                    selectedItem.id,
                    selectedItem
                  );
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.grandParentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === selectedItem.parentId
                          ? {
                              ...g,
                              items: g.items.map((i) =>
                                i.id === result.id ? result : i
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
          if (
            selectedItem.menuId &&
            selectedItem.groupId &&
            selectedItem.itemId
          ) {
            result =
              selectedItem.id === 0
                ? await menuService.createModifier(
                    clientId,
                    selectedItem.menuId,
                    selectedItem.groupId,
                    selectedItem.itemId,
                    selectedItem
                  )
                : await menuService.updateModifier(
                    clientId,
                    selectedItem.menuId,
                    selectedItem.groupId,
                    selectedItem.itemId,
                    selectedItem.id,
                    selectedItem
                  );
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.menuId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === selectedItem.groupId
                          ? {
                              ...g,
                              items: g.items.map((i) =>
                                i.id === selectedItem.itemId
                                  ? {
                                      ...i,
                                      modifiers: i.modifiers.map((mod) =>
                                        mod.id === result.id ? result : mod
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
      setIsModalOpen(false);
      setSnackbar({ message: 'Item saved successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({
        message: 'Failed to save item. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (
    type: 'menu' | 'group' | 'item' | 'modifier',
    item: SelectedItem
  ) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (
    type: 'menu' | 'group' | 'item' | 'modifier',
    id: number
  ) => {
    if (!clientId) return;
    try {
      await menuService.deleteItem(clientId, type, id);
      setMenus(menus.filter((m) => m.id !== id));
      setSnackbar({
        message: 'Item deleted successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        message: 'Failed to delete item. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleAdd = (
    type: 'menu' | 'group' | 'item' | 'modifier',
    parentId?: number,
    grandParentId?: number
  ) => {
    setModalType(type);
    setSelectedItem({ id: 0, name: '', parentId, grandParentId });
    setIsModalOpen(true);
  };

  const handleSync = useCallback(async () => {
    if (!clientId) return;
    try {
      setSyncStatus('Syncing menus...');
      await menuService.syncMenus(clientId);
      setSyncStatus('Menus synced successfully');
      loadMenus();
    } catch (error) {
      setSyncStatus('Error syncing menus');
      console.error('Error syncing menus:', error);
    }
  }, [clientId, menuService, loadMenus]);

  const renderMenuStructure = (menu: Menu) => {
    return (
      <List key={menu.id}>
        <ListItem>
          <ListItemText primary={menu.name} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleEdit('menu', menu)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete('menu', menu.id)}
              size="small"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
            <Button
              onClick={() => handleAdd('group', menu.id)}
              startIcon={<AddIcon />}
              size="small"
            >
              Add Group
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        {menu.menuGroups.map((group: MenuGroup) => (
          <List key={group.id} component="div" disablePadding>
            <ListItem style={{ paddingLeft: 32 }}>
              <ListItemText primary={group.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() =>
                    handleEdit('group', { ...group, parentId: menu.id })
                  }
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete('group', group.id)}
                  size="small"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
                <Button
                  onClick={() => handleAdd('item', group.id, menu.id)}
                  startIcon={<AddIcon />}
                  size="small"
                >
                  Add Item
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            {group.items.map((item: MenuItem) => (
              <List key={item.id} component="div" disablePadding>
                <ListItem style={{ paddingLeft: 64 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price.toFixed(2)}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() =>
                        handleEdit('item', {
                          ...item,
                          parentId: group.id,
                          grandParentId: menu.id,
                        })
                      }
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete('item', item.id)}
                      size="small"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      onClick={() => handleAdd('modifier', item.id, group.id)}
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Add Modifier
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {item.modifiers.map((modifier: Modifier) => (
                  <ListItem key={modifier.id} style={{ paddingLeft: 96 }}>
                    <ListItemText
                      primary={modifier.name}
                      secondary={`$${modifier.price.toFixed(2)}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() =>
                          handleEdit('modifier', {
                            ...modifier,
                            parentId: item.id,
                            grandParentId: group.id,
                          })
                        }
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete('modifier', modifier.id)}
                        size="small"
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ))}
          </List>
        ))}
      </List>
    );
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      console.log('Admin user logged in:', user.username);
    }
  }, [user]);

  const renderModalContent = () => {
    if (!selectedItem) return null;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Typography variant="h6">
          {modalType === 'menu'
            ? 'Menu'
            : modalType === 'group'
              ? 'Menu Group'
              : modalType === 'item'
                ? 'Menu Item'
                : 'Modifier'}
        </Typography>
        <TextField
          label="Name"
          value={selectedItem.name}
          onChange={(e) =>
            setSelectedItem({ ...selectedItem, name: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        {(modalType === 'item' || modalType === 'modifier') && (
          <TextField
            label="Price"
            type="number"
            value={selectedItem.price || ''}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                price: parseFloat(e.target.value),
              })
            }
            fullWidth
            margin="normal"
          />
        )}
        {modalType === 'item' && (
          <TextField
            label="Description"
            value={selectedItem.description || ''}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, description: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        )}
        {modalType !== 'menu' && (
          <FormControlLabel
            control={
              <Switch
                checked={selectedItem.isAvailable || false}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    isAvailable: e.target.checked,
                  })
                }
              />
            }
            label="Available"
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </form>
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4">Menu Management</Typography>
      <TextField
        label="Search Menu Items"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Button onClick={handleSync} startIcon={<SyncIcon />}>
        Sync Menus
      </Button>
      {syncStatus && <Typography>{syncStatus}</Typography>}
      {(searchQuery ? filteredMenus : menus).map((menu) => (
        <Accordion key={menu.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{menu.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderMenuStructure(menu)}</AccordionDetails>
        </Accordion>
      ))}
      <Button
        onClick={() => handleAdd('menu')}
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
      >
        Add Menu
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Paper
          style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}
        >
          {renderModalContent()}
        </Paper>
      </Modal>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(null)}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity}
          sx={{ width: '100%' }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MenuManagementAdmin;
