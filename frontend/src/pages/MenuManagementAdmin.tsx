import React, { useState, useEffect, useCallback } from 'react';
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
  Grid,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { useParams } from 'react-router-dom';
import { menuService } from '../services/menuService';
import { useAuth } from '../context/AuthContext';
import { Menu, MenuGroup, MenuItem, Modifier } from '../types/menuTypes';

interface SelectedItem {
  id: string;
  name: string;
  parentId?: string;
  grandParentId?: string;
  price?: number;
  description?: string;
  isAvailable?: boolean;
  menuId?: string;
  groupId?: string;
  itemId?: string;
}

const MenuManagementAdmin: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'menu' | 'group' | 'item' | 'modifier'>('menu');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);

  const { clientId } = useParams<{ clientId: string }>();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  }, [clientId]);

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
      let result: Menu | MenuGroup | MenuItem | Modifier;
      switch (modalType) {
        case 'menu':
          result =
            selectedItem.id === '0'
              ? await menuService.createMenu(clientId, selectedItem as Partial<Menu>)
              : await menuService.updateMenu(clientId, selectedItem.id, selectedItem as Partial<Menu>);
          setMenus(menus.map((m) => (m.id === result.id ? result as Menu : m)));
          break;
        case 'group':
          if (selectedItem.parentId) {
            result =
              selectedItem.id === '0'
                ? await menuService.createMenuGroup(clientId, selectedItem.parentId, selectedItem as Partial<MenuGroup>)
                : await menuService.updateMenuGroup(clientId, selectedItem.parentId, selectedItem.id, selectedItem as Partial<MenuGroup>);
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.parentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) => (g.id === result.id ? result as MenuGroup : g)),
                    }
                  : m
              )
            );
          }
          break;
        case 'item':
          if (selectedItem.grandParentId && selectedItem.parentId) {
            const itemData: Omit<MenuItem, 'id'> = {
              name: selectedItem.name,
              description: selectedItem.description || '',
              price: selectedItem.price || 0,
              image: '', // Add a default image or make it optional in your MenuItem type
              modifiers: [],
              defaultModifiers: [],
              reviewsEnabled: false,
              showQuantityAvailable: false,
              isAvailable: selectedItem.isAvailable || false,
              imageUrl: 'sample-image-url.jpg', // Added property
              groupName: 'Sample Group'         // Added property
            };
            result = selectedItem.id === '0'
              ? await menuService.createMenuItem(clientId, selectedItem.grandParentId, itemData)
              : await menuService.updateMenuItem(clientId, selectedItem.grandParentId, selectedItem.id, itemData as MenuItem);
            setMenus(
              menus.map((m) =>
                m.id === selectedItem.grandParentId
                  ? {
                      ...m,
                      menuGroups: m.menuGroups.map((g) =>
                        g.id === selectedItem.parentId
                          ? {
                              ...g,
                              items: g.items.map((i) => (i.id === result.id ? result as MenuItem : i)),
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
          if (selectedItem.menuId && selectedItem.groupId && selectedItem.itemId) {
            result =
              selectedItem.id === '0'
                ? await menuService.createModifier(clientId, selectedItem.menuId, selectedItem.groupId, selectedItem.itemId, selectedItem as Partial<Modifier>)
                : await menuService.updateModifier(clientId, selectedItem.menuId, selectedItem.groupId, selectedItem.itemId, selectedItem.id, selectedItem as Partial<Modifier>);
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
                                      modifiers: (i as MenuItem & { modifiers?: Modifier[] }).modifiers?.map((mod) =>
                                        mod.id === result.id ? result as Modifier : mod
                                      ) || [],
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
    id: string
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
    parentId?: string,
    grandParentId?: string
  ) => {
    setModalType(type);
    setSelectedItem({ id: '0', name: '', parentId, grandParentId });
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
  }, [clientId, loadMenus]);

  const renderMenuStructure = (menu: Menu): JSX.Element => {
    return (
      <Accordion key={menu.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{menu.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menu.menuGroups.map((group) => (
            <Accordion key={group.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{group.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {group.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={item.name}
                        secondary={`$${item.price.toFixed(2)}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEdit('item', item)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete('item', item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    return (
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <Typography variant="h6">
          {modalType === 'menu' ? 'Menu' :
           modalType === 'group' ? 'Menu Group' :
           modalType === 'item' ? 'Menu Item' : 'Modifier'}
        </Typography>
        <TextField
          label="Name"
          value={selectedItem.name}
          onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        {(modalType === 'item' || modalType === 'modifier') && (
          <TextField
            label="Price"
            type="number"
            value={selectedItem.price || ''}
            onChange={(e) => setSelectedItem({
              ...selectedItem,
              price: parseFloat(e.target.value),
            })}
            fullWidth
            margin="normal"
          />
        )}
        {modalType === 'item' && (
          <TextField
            label="Description"
            value={selectedItem.description || ''}
            onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
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
                onChange={(e) => setSelectedItem({
                  ...selectedItem,
                  isAvailable: e.target.checked,
                })}
              />
            }
            label="Available"
          />
        )}
        <Button type="submit" variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </form>
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="menu-management-admin" sx={{ p: isMobile ? 1 : 2 }}>
      <Typography variant="h4" gutterBottom>Menu Management</Typography>
      <TextField
        label="Search Menu Items"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
        aria-label="Search menu items"
      />
      <Button onClick={handleSync} startIcon={<SyncIcon />} aria-label="Sync menus">
        Sync Menus
      </Button>
      {syncStatus && <Typography role="status">{syncStatus}</Typography>}
      <Grid container spacing={isMobile ? 1 : 2}>
        {(searchQuery ? filteredMenus : menus).map((menu) => (
          <Grid item xs={12} md={isMobile ? 12 : 6} key={menu.id}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label={`Expand ${menu.name} menu`}>
                <Typography>{menu.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>{renderMenuStructure(menu)}</AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => handleAdd('menu')}
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        aria-label="Add new menu"
      >
        Add Menu
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-title">
        <Paper style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}>
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
    </Box>
  );
};

export default MenuManagementAdmin;