import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClientAsync } from '../../redux/slices/clientSlice';
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../redux/store';
import { ClientData } from '../../types/clientTypes';

const ClientBuilderWizard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(0);

  const validationSchema = Yup.object({
    name: Yup.string().required('Client name is required'),
    domain: Yup.string().required('Domain is required'),
    primaryColor: Yup.string().required('Primary color is required'),
    secondaryColor: Yup.string().required('Secondary color is required'),
    logo: Yup.string()
      .url('Must be a valid URL')
      .required('Logo URL is required'),
    features: Yup.object({
      loyalty: Yup.boolean(),
      onlineOrdering: Yup.boolean(),
      tableReservations: Yup.boolean(),
    }),
  });

  const formik = useFormik<ClientData>({
    initialValues: {
      name: '',
      domain: '',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      logo: '',
      features: {
        loyalty: false,
        onlineOrdering: false,
        tableReservations: false,
      },
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createClientAsync(values));
    },
  });

  const steps = ['Basic Info', 'Branding', 'Features', 'Confirmation'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              name="name"
              label="Client Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              name="domain"
              label="Domain"
              value={formik.values.domain}
              onChange={formik.handleChange}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
              helperText={formik.touched.domain && formik.errors.domain}
              fullWidth
              margin="normal"
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              name="primaryColor"
              label="Primary Color"
              type="color"
              value={formik.values.primaryColor}
              onChange={formik.handleChange}
              error={formik.touched.primaryColor && Boolean(formik.errors.primaryColor)}
              helperText={formik.touched.primaryColor && formik.errors.primaryColor}
              fullWidth
              margin="normal"
            />
            <TextField
              name="secondaryColor"
              label="Secondary Color"
              type="color"
              value={formik.values.secondaryColor}
              onChange={formik.handleChange}
              error={formik.touched.secondaryColor && Boolean(formik.errors.secondaryColor)}
              helperText={formik.touched.secondaryColor && formik.errors.secondaryColor}
              fullWidth
              margin="normal"
            />
            <TextField
              name="logo"
              label="Logo URL"
              value={formik.values.logo}
              onChange={formik.handleChange}
              error={formik.touched.logo && Boolean(formik.errors.logo)}
              helperText={formik.touched.logo && formik.errors.logo}
              fullWidth
              margin="normal"
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6">Activate Features</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.features.loyalty}
                  onChange={formik.handleChange}
                  name="features.loyalty"
                />
              }
              label="Loyalty Program"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.features.onlineOrdering}
                  onChange={formik.handleChange}
                  name="features.onlineOrdering"
                />
              }
              label="Online Ordering"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.features.tableReservations}
                  onChange={formik.handleChange}
                  name="features.tableReservations"
                />
              }
              label="Table Reservations"
            />
          </>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6">Confirm Client Details</Typography>
            <Typography>Name: {formik.values.name}</Typography>
            <Typography>Domain: {formik.values.domain}</Typography>
            <Typography>Primary Color: {formik.values.primaryColor}</Typography>
            <Typography>Secondary Color: {formik.values.secondaryColor}</Typography>
            <Typography>Logo: {formik.values.logo}</Typography>
            <Typography>Features:</Typography>
            <Typography>- Loyalty: {formik.values.features.loyalty ? 'Yes' : 'No'}</Typography>
            <Typography>- Online Ordering: {formik.values.features.onlineOrdering ? 'Yes' : 'No'}</Typography>
            <Typography>- Table Reservations: {formik.values.features.tableReservations ? 'Yes' : 'No'}</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={formik.handleSubmit}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Create Client
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ClientBuilderWizard;
