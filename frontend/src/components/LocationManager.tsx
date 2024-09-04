import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchLocations,
  updateLocation,
} from '../redux/slices/locationSlice';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { PaymentGateway } from '../types';
import LocationBuilder from './LocationBuilder';

const LocationManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.locations.locations
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedLocation(null);
  };

  const handleSave = () => {
    dispatch(updateLocation(selectedLocation));
    handleClose();
  };

  const handleExceptionChange = (field: string) => {
    setSelectedLocation({
      ...selectedLocation,
      [field]: !selectedLocation[field],
    });
  };

  const handlePaymentGatewayChange = (gateway: PaymentGateway) => {
    const updatedGateways = selectedLocation.paymentGatewayExceptions.includes(
      gateway
    )
      ? selectedLocation.paymentGatewayExceptions.filter((g) => g !== gateway)
      : [...selectedLocation.paymentGatewayExceptions, gateway];
    setSelectedLocation({
      ...selectedLocation,
      paymentGatewayExceptions: updatedGateways,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Location Manager</Typography>
      <List>
        {locations.map((location) => (
          <ListItem key={location.id}>
            <ListItemText
              primary={location.name}
              secondary={location.address}
            />
            <Button onClick={() => handleEdit(location)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      <LocationBuilder />
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent>
          {selectedLocation && (
            <>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLocation.twoFactorException}
                      onChange={() =>
                        handleExceptionChange('twoFactorException')
                      }
                    />
                  }
                  label="Two-Factor Authentication Exception"
                />
              </FormGroup>
              <Typography variant="h6">Payment Gateway Exceptions</Typography>
              <FormGroup>
                {Object.values(PaymentGateway).map((gateway) => (
                  <FormControlLabel
                    key={gateway}
                    control={
                      <Checkbox
                        checked={selectedLocation.paymentGatewayExceptions.includes(
                          gateway
                        )}
                        onChange={() => handlePaymentGatewayChange(gateway)}
                      />
                    }
                    label={gateway}
                  />
                ))}
              </FormGroup>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LocationManager;
