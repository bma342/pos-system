import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useClientBranding = () => {
  return useSelector((state: RootState) => state.clientBranding.branding);
};
