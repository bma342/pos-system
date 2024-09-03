import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import LoginForm, { LoginFormInputs } from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: LoginFormInputs) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm onSuccess={onLogin} onError={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;