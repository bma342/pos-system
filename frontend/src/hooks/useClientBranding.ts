import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ClientBranding } from '../types/clientTypes';

export const useClientBranding = () => {
  const branding = useSelector((state: RootState) => state.clientBranding.branding);
  const loading = useSelector((state: RootState) => state.clientBranding.loading);
  const error = useSelector((state: RootState) => state.clientBranding.error);

  return { 
    branding, 
    loading, 
    error 
  } as {
    branding: ClientBranding | null;
    loading: boolean;
    error: string | null;
  };
};
