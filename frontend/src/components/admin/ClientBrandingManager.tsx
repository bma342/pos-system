import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  updateClientBranding,
  fetchClientBranding,
} from '../../redux/slices/clientBrandingSlice';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { SketchPicker, ColorResult } from 'react-color';
import { ClientBranding } from '../../types/clientTypes';

const ClientBrandingManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { branding, status } = useSelector(
    (state: RootState) => state.clientBranding
  );
  const [localBranding, setLocalBranding] = useState<ClientBranding | null>(
    branding
  );

  useEffect(() => {
    dispatch(fetchClientBranding());
  }, [dispatch]);

  useEffect(() => {
    if (branding) {
      setLocalBranding(branding);
    }
  }, [branding]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (localBranding) {
      setLocalBranding({ ...localBranding, [e.target.name]: e.target.value });
    }
  };

  const handleColorChange = (
    color: ColorResult,
    colorType: keyof ClientBranding
  ) => {
    if (localBranding) {
      setLocalBranding({ ...localBranding, [colorType]: color.hex });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (localBranding) {
      setLocalBranding({ ...localBranding, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localBranding) {
      dispatch(updateClientBranding(localBranding));
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (!localBranding)
    return <Typography>No branding data available</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Client Branding Manager
      </Typography>
      <TextField
        name="logo"
        label="Logo URL"
        value={localBranding.logo}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="favicon"
        label="Favicon URL"
        value={localBranding.favicon}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Font Family</InputLabel>
        <Select
          name="fontFamily"
          value={localBranding.fontFamily}
          onChange={handleSelectChange}
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Helvetica">Helvetica</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Button Style</InputLabel>
        <Select
          name="buttonStyle"
          value={localBranding.buttonStyle}
          onChange={handleSelectChange}
        >
          <MenuItem value="rounded">Rounded</MenuItem>
          <MenuItem value="square">Square</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Header Style</InputLabel>
        <Select
          name="headerStyle"
          value={localBranding.headerStyle}
          onChange={handleSelectChange}
        >
          <MenuItem value="centered">Centered</MenuItem>
          <MenuItem value="left-aligned">Left Aligned</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="footerContent"
        label="Footer Content"
        value={localBranding.footerContent}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box>
          <Typography variant="subtitle1">Primary Color</Typography>
          <SketchPicker
            color={localBranding.primaryColor}
            onChangeComplete={(color: ColorResult) =>
              handleColorChange(color, 'primaryColor')
            }
          />
        </Box>
        <Box>
          <Typography variant="subtitle1">Secondary Color</Typography>
          <SketchPicker
            color={localBranding.secondaryColor}
            onChangeComplete={(color: ColorResult) =>
              handleColorChange(color, 'secondaryColor')
            }
          />
        </Box>
        <Box>
          <Typography variant="subtitle1">Accent Color</Typography>
          <SketchPicker
            color={localBranding.accentColor}
            onChangeComplete={(color: ColorResult) =>
              handleColorChange(color, 'accentColor')
            }
          />
        </Box>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Save Branding
      </Button>
    </Box>
  );
};

export default ClientBrandingManager;
