import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isGlobalAdmin = user?.role === 'GLOBAL_ADMIN';
  const authToken = useSelector((state: RootState) => state.auth.token);

  return { user, isGlobalAdmin, authToken };
};
