import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../redux/slices/marketingSlice';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MarketingCampaigns: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const campaigns = useSelector((state: RootState) => state.marketing.campaigns);
  const [open, setOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleOpen = (campaign: any = null) => {
    setEditingCampaign(campaign);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingCampaign(null);
    setOpen(false);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const campaignData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
    };

    if (editingCampaign) {
      dispatch(updateCampaign({ id: editingCampaign.id, ...campaignData }));
    } else {
      dispatch(createCampaign(campaignData));
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      dispatch(deleteCampaign(id));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Marketing Campaigns
      </Typography>
      <Button startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Create Campaign
      </Button>
      <List>
        {campaigns.map((campaign) => (
          <ListItem key={campaign.id} sx={{ border: '1px solid #ddd', mb: 1, borderRadius: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{campaign.name}</Typography>
              <Typography variant="body2">{campaign.description}</Typography>
              <Typography variant="caption">
                {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
              </Typography>
            </Box>
            <IconButton onClick={() => handleOpen(campaign)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(campaign.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSave}>
          <DialogTitle>{editingCampaign ? 'Edit Campaign' : 'Create Campaign'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Campaign Name"
              fullWidth
              defaultValue={editingCampaign?.name || ''}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              defaultValue={editingCampaign?.description || ''}
            />
            <TextField
              margin="dense"
              name="startDate"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              defaultValue={editingCampaign?.startDate || ''}
            />
            <TextField
              margin="dense"
              name="endDate"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              defaultValue={editingCampaign?.endDate || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{editingCampaign ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default MarketingCampaigns;
