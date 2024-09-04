import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useSelectedLocation = () => {
  const selectedLocation = useSelector((state: RootState) => state.location.selectedLocation);
  return { selectedLocation };
};
