import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
} from '../redux/slices/authSlice';
import { AppDispatch } from '../types';
import { TextField, Typography, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Layout from '../components/Layout'; // Ensure this file is correctly typed to accept children

interface IFormInput {
  email: string;
  password: string;
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 300px;
`;

const Login: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <Layout>
      <FormWrapper>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            {status === 'loading' ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </StyledForm>
        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
      </FormWrapper>
    </Layout>
  );
});

Login.displayName = 'Login';

export default Login;
