import React, { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { unwrapResult } from '@reduxjs/toolkit';

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const authStatus = useSelector((state: RootState) => state.auth.status);
  const isLoading = authStatus === 'loading';

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const actionResult = await dispatch(loginUser(data));
      const user = unwrapResult(actionResult);
      if (onSuccess) {
        onSuccess(user);
      } else {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
      if (onError) {
        onError(error);
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        inputRef={emailRef}
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        disabled={isLoading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
        disabled={isLoading}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
    </Box>
  );
};

export default LoginForm;
