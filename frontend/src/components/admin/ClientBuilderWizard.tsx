import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClient } from '../../redux/slices/clientSlice';
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

const ClientBuilderWizard: React.FC = () => {
  const dispatch = useDispatch();
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

  const formik = useFormik({
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
      dispatch(createClient(values));
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
              error={
                formik.touched.primaryColor &&
                Boolean(formik.errors.primaryColor)
              }
              helperText={
                formik.touched.primaryColor && formik.errors.primaryColor
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="secondaryColor"
              label="Secondary Color"
              type="color"
              value={formik.values.secondaryColor}
              onChange={formik.handleChange}
              error={
                formik.touched.secondaryColor &&
                Boolean(formik.errors.secondaryColor)
              }
              helperText={
                formik.touched.secondaryColor && formik.errors.secondaryColor
              }
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
            <Typography>
              Secondary Color: {formik.values.secondaryColor}
            </Typography>
            <Typography>Logo: {formik.values.logo}</Typography>
            <h3>Confirm Client Details</h3>
            <p>Name: {clientData.name}</p>
            <p>Domain: {clientData.domain}</p>
            <p>Primary Color: {clientData.primaryColor}</p>
            <p>Secondary Color: {clientData.secondaryColor}</p>
            <p>Logo: {clientData.logo}</p>
          </Box>
        );
      default:
        return 'Unknown step';
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
      <Box sx={{ mt: 2 }}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Create Client</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClientBuilderWizard;
