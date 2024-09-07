import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectCurrentUser, selectIsAuthenticated } from '../redux/slices/authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isGlobalAdmin = user?.role === 'GLOBAL_ADMIN';
  const authToken = useSelector((state: RootState) => state.auth.token);

  return { user, isAuthenticated, isGlobalAdmin, authToken };
};
