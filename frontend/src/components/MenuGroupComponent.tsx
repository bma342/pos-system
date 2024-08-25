import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { updateMenu } from '../redux/slices/menuSlice';
import { MenuGroup, MenuItem, AppDispatch } from '../types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface MenuGroupComponentProps {
  group: MenuGroup;
  index: number;
  menuId: string;
}

const MenuGroupComponent: React.FC<MenuGroupComponentProps> = ({
  group,
  index,
  menuId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleAddItem = () => {
    if (!newItemName || !newItemPrice) return;

    const newItem: MenuItem = {
      id: Date.now(),
      name: newItemName,
      price: parseFloat(newItemPrice),
      description: '',
    };

    const updatedGroup = { ...group, items: [...group.items, newItem] };
    dispatch(
      updateMenu({
        clientId: parseInt(menuId),
        menuId: parseInt(menuId),
        menuData: { groups: [updatedGroup] },
      })
    );

    setNewItemName('');
    setNewItemPrice('');
    setIsAddItemDialogOpen(false);
  };

  return (
    <Draggable draggableId={`group-${group.id}`} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={3}
          sx={{ p: 2, mb: 2 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {group.name}
          </Typography>
          <Droppable droppableId={`group-${group.id}`} type="item">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                {group.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`item-${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        elevation={1}
                        sx={{ p: 1 }}
                      >
                        <Typography>
                          {item.name} - ${item.price.toFixed(2)}
                        </Typography>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setIsAddItemDialogOpen(true)}
            sx={{ mt: 2 }}
          >
            Add Item
          </Button>
          <Dialog
            open={isAddItemDialogOpen}
            onClose={() => setIsAddItemDialogOpen(false)}
          >
            <DialogTitle>Add New Item</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Item Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Item Price"
                type="number"
                fullWidth
                variant="outlined"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsAddItemDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </Draggable>
  );
};

export default MenuGroupComponent;
