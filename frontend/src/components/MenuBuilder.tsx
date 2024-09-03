import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { RootState, AppDispatch, Menu, MenuGroup } from '../types';
import { fetchMenus, updateMenu } from '../redux/slices/menuSlice';
import MenuGroupComponent from './MenuGroupComponent';
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
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const { clientId } = useClientContext();

  useEffect(() => {
    if (clientId) {
      dispatch(fetchMenus(clientId));
    }
  }, [dispatch, clientId]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !activeMenu) {
      return;
    }

    const newGroups = Array.from(activeMenu.groups);
    const [reorderedGroup] = newGroups.splice(result.source.index, 1);
    newGroups.splice(result.destination.index, 0, reorderedGroup);

    const updatedMenu: Menu = {
      ...activeMenu,
      groups: newGroups,
    };

    setActiveMenu(updatedMenu);
    dispatch(updateMenu({ clientId, menuId: activeMenu.id, menuData: updatedMenu }));
  };

  const handleAddGroup = () => {
    if (activeMenu && newGroupName.trim()) {
      const updatedMenu: Menu = {
        ...activeMenu,
        groups: [
          ...activeMenu.groups,
          { id: Date.now().toString(), name: newGroupName.trim(), items: [] },
        ],
      };
      dispatch(updateMenu({ clientId, menuId: activeMenu.id, menuData: updatedMenu }));
      setIsAddGroupDialogOpen(false);
      setNewGroupName('');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Menu Builder
      </Typography>
      {menus.map((menu) => (
        <Box key={menu.id} mb={2}>
          <Button
            variant={activeMenu?.id === menu.id ? 'contained' : 'outlined'}
            onClick={() => setActiveMenu(menu)}
          >
            {menu.name}
          </Button>
        </Box>
      ))}
      {activeMenu && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="menu">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {activeMenu.groups.map((group, index) => (
                  <Draggable key={group.id} draggableId={group.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MenuGroupComponent
                          group={group}
                          index={index}
                          menuId={activeMenu.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setIsAddGroupDialogOpen(true)}
        variant="contained"
        color="primary"
        style={{ marginTop: '16px' }}
      >
        Add Group
      </Button>
      <Dialog open={isAddGroupDialogOpen} onClose={() => setIsAddGroupDialogOpen(false)}>
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddGroupDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddGroup} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MenuBuilder;
