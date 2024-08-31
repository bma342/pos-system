import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { MenuService } from '../../services/MenuService';
import { Menu, MenuGroup } from '../../types/menuTypes';
import { updateLocationMenu } from '../../redux/slices/menuSlice';
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const MenuBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locationId = useSelector(
    (state: RootState) => state.location.currentLocation?.id
  );
  const menu = useSelector((state: RootState) => state.menu.locationMenu);

  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState<MenuGroup | null>(null);

  const menuService = React.useMemo(() => new MenuService(), []);

  const fetchMenu = useCallback(async () => {
    if (locationId) {
      try {
        const fetchedMenu: Menu = await menuService.getLocationMenu(locationId);
        dispatch(updateLocationMenu(fetchedMenu));
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    }
  }, [locationId, menuService, dispatch]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleAddGroup = useCallback(async () => {
    if (locationId && newGroupName.trim()) {
      try {
        const updatedMenu: Menu = await menuService.addMenuGroup(
          locationId,
          newGroupName
        );
        dispatch(updateLocationMenu(updatedMenu));
        setNewGroupName('');
        setIsAddingGroup(false);
      } catch (error) {
        console.error('Failed to add menu group:', error);
      }
    }
  }, [locationId, newGroupName, menuService, dispatch]);

  const handleEditGroup = useCallback(async () => {
    if (locationId && editingGroup) {
      try {
        const updatedMenu: Menu = await menuService.updateMenuGroup(
          locationId,
          editingGroup.id,
          editingGroup.name
        );
        dispatch(updateLocationMenu(updatedMenu));
        setEditingGroup(null);
      } catch (error) {
        console.error('Failed to update menu group:', error);
      }
    }
  }, [locationId, editingGroup, menuService, dispatch]);

  const handleDeleteGroup = useCallback(
    async (groupId: number) => {
      if (locationId) {
        try {
          const updatedMenu: Menu = await menuService.deleteMenuGroup(
            locationId,
            groupId
          );
          dispatch(updateLocationMenu(updatedMenu));
        } catch (error) {
          console.error('Failed to delete menu group:', error);
        }
      }
    },
    [locationId, menuService, dispatch]
  );

  return (
    <Box>
      <Typography variant="h4">Menu Builder</Typography>
      <Button startIcon={<AddIcon />} onClick={() => setIsAddingGroup(true)}>
        Add Menu Group
      </Button>
      <List>
        {menu?.groups.map((group) => (
          <ListItem key={group.id}>
            <ListItemText primary={group.name} />
            <IconButton onClick={() => setEditingGroup(group)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteGroup(group.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={isAddingGroup} onClose={() => setIsAddingGroup(false)}>
        <DialogTitle>Add Menu Group</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Group Name"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingGroup(false)}>Cancel</Button>
          <Button onClick={handleAddGroup}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!editingGroup} onClose={() => setEditingGroup(null)}>
        <DialogTitle>Edit Menu Group</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Group Name"
            fullWidth
            value={editingGroup?.name || ''}
            onChange={(e) =>
              setEditingGroup(
                editingGroup ? { ...editingGroup, name: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingGroup(null)}>Cancel</Button>
          <Button onClick={handleEditGroup}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuBuilder;
