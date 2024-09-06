import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenu, updateMenu } from '../redux/slices/menuSlice';
import { Menu, MenuGroup, MenuItem } from '../types/menuTypes';
import { Box, Typography, Button, TextField, List, ListItem, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useSelectedClient } from '../hooks/useSelectedClient';

const MenuBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const selectedClient = useSelectedClient();
  const menu = useSelector((state: RootState) => state.menu.currentMenu);
  const loading = useSelector((state: RootState) => state.menu.status === 'loading');

  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLocation && selectedClient) {
      dispatch(fetchMenu({ 
        clientId: selectedClient.id.toString(), 
        locationId: selectedLocation.id.toString() 
      }));
    }
  }, [dispatch, selectedLocation, selectedClient]);

  const handleAddGroup = () => {
    if (!menu || !selectedClient || !selectedLocation) return;

    const newGroup: MenuGroup = {
      id: Date.now().toString(),
      name: newGroupName.trim(),
      items: []
    };

    const updatedMenu: Menu = {
      ...menu,
      menuGroups: [...menu.menuGroups, newGroup]
    };

    dispatch(updateMenu({
      clientId: selectedClient.id.toString(),
      locationId: selectedLocation.id.toString(),
      menuData: updatedMenu
    }));

    setNewGroupName('');
  };

  const handleUpdateGroup = (groupId: string, newName: string) => {
    if (!menu || !selectedClient || !selectedLocation) return;

    const updatedMenu: Menu = {
      ...menu,
      menuGroups: menu.menuGroups.map(group =>
        group.id === groupId ? { ...group, name: newName } : group
      )
    };

    dispatch(updateMenu({
      clientId: selectedClient.id.toString(),
      locationId: selectedLocation.id.toString(),
      menuData: updatedMenu
    }));

    setEditingGroupId(null);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (!menu || !selectedClient || !selectedLocation) return;

    const updatedMenu: Menu = {
      ...menu,
      menuGroups: menu.menuGroups.filter(group => group.id !== groupId)
    };

    dispatch(updateMenu({
      clientId: selectedClient.id.toString(),
      locationId: selectedLocation.id.toString(),
      menuData: updatedMenu
    }));
  };

  const onDragEnd = (result: any) => {
    // Implement drag and drop logic here
  };

  if (loading) return <Typography>Loading menu...</Typography>;
  if (!menu) return <Typography>No menu available</Typography>;

  return (
    <Box className="menu-builder" role="main" aria-label="Menu Builder">
      <Typography variant="h4" gutterBottom>Menu Builder</Typography>
      <Box className="add-group-form" mb={2}>
        <TextField
          label="New Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          aria-label="New group name input"
        />
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddGroup}
          disabled={!newGroupName.trim()}
          aria-label="Add new group"
        >
          Add Group
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="menu-groups">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {menu.menuGroups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingGroupId === group.id ? (
                        <TextField
                          value={group.name}
                          onChange={(e) => handleUpdateGroup(group.id, e.target.value)}
                          onBlur={() => setEditingGroupId(null)}
                          autoFocus
                          aria-label={`Edit ${group.name}`}
                        />
                      ) : (
                        <>
                          <Typography>{group.name}</Typography>
                          <IconButton onClick={() => setEditingGroupId(group.id)} aria-label={`Edit ${group.name}`}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteGroup(group.id)} aria-label={`Delete ${group.name}`}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default MenuBuilder;
