import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useSelectedClient = () => {
  return useSelector((state: RootState) => state.clientConfig.selectedClient);
};