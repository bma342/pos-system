import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { RootState, AppDispatch, Menu as MenuType, MenuGroup } from '../types';
import { fetchMenus, updateMenu } from '../redux/slices/menuSlice';
import MenuGroupComponent from '../components/MenuGroupComponent';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useClientContext } from '../context/ClientContext';

const MenuBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector((state: RootState) => state.menu.menus);
  const [activeMenu, setActiveMenu] = useState<MenuType | null>(null);
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const { clientId } = useClientContext();

  useEffect(() => {
    if (clientId) {
      dispatch(fetchMenus(clientId));
    }
  }, [dispatch, clientId]);

  useEffect(() => {
    if (menus.length > 0 && !activeMenu) {
      setActiveMenu(menus[0]);
    }
  }, [menus, activeMenu]);

  const handleSaveMenu = async () => {
    if (activeMenu) {
      const updatedMenu: Menu = {
        ...activeMenu,
        clientId: clientId.toString(),
        menuId: activeMenu.id.toString(),
        menuData: activeMenu,
      };
      await dispatch(updateMenu(updatedMenu));
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !activeMenu) return;

    const newMenu = { ...activeMenu };
    const [sourceParentId, sourceIndex] = result.source.droppableId.split('-');
    const [destParentId, destIndex] = result.destination.droppableId.split('-');

    if (sourceParentId === 'menu' && destParentId === 'menu') {
      const [reorderedGroup] = newMenu.groups.splice(parseInt(sourceIndex), 1);
      newMenu.groups.splice(parseInt(destIndex), 0, reorderedGroup);
    } else {
      const sourceGroup = newMenu.groups.find(
        (g) => g.id.toString() === sourceParentId
      );
      const destGroup = newMenu.groups.find(
        (g) => g.id.toString() === destParentId
      );

      if (sourceGroup && destGroup) {
        const [reorderedItem] = sourceGroup.items.splice(
          parseInt(sourceIndex),
          1
        );
        destGroup.items.splice(parseInt(destIndex), 0, reorderedItem);
      }
    }

    setActiveMenu(newMenu);
    if (clientId) {
      handleSaveMenu();
    }
  };

  const handleAddGroup = () => {
    if (activeMenu && newGroupName) {
      const newGroup: MenuGroup = {
        id: Date.now(),
        name: newGroupName,
        items: [],
      };
      setActiveMenu({
        ...activeMenu,
        groups: [...activeMenu.groups, newGroup],
      });
      setNewGroupName('');
      setIsAddGroupDialogOpen(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Menu Builder</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {menus.map((menu) => (
          <Button
            key={menu.id}
            onClick={() => setActiveMenu(menu as Menu)}
            variant={activeMenu?.id.toString() === menu.id.toString() ? 'contained' : 'outlined'}
          >
            {menu.name}
          </Button>
        ))}
      </Box>
      {activeMenu && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="menu-0" type="group">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                {activeMenu.groups.map((group, index) => (
                  <MenuGroupComponent
                    key={group.id}
                    group={group}
                    index={index}
                    menuId={activeMenu.id.toString()}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setIsAddGroupDialogOpen(true)}
        sx={{ mt: 2 }}
      >
        Add Group
      </Button>
      <Dialog
        open={isAddGroupDialogOpen}
        onClose={() => setIsAddGroupDialogOpen(false)}
      >
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddGroupDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddGroup}>Add</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleSaveMenu} sx={{ mt: 2 }}>
        Save Menu
      </Button>
    </Box>
  );
};

export default MenuBuilder;
