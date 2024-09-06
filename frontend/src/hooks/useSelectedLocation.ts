import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useSelectedLocation = () => {
  const selectedLocationId = useSelector((state: RootState) => state.location.selectedLocation);
  const locations = useSelector((state: RootState) => state.location.locations);
  
  const selectedLocation = locations.find(location => location.id === selectedLocationId) || null;

  return { selectedLocation };
};
