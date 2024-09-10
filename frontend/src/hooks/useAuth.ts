import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout as logoutAction } from '../redux/slices/authSlice';
import { UserRole } from '../types/userTypes';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const logout = () => {
    dispatch(logoutAction());
  };

  const isGlobalAdmin = user?.role === UserRole.GLOBAL_ADMIN;

  return { user, isAuthenticated, isGlobalAdmin, logout };
};
