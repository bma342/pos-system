import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';

export const useLocations = (clientId: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const loading = useSelector((state: RootState) => state.location.loading);
  const error = useSelector((state: RootState) => state.location.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchLocations(clientId));
    }
  }, [dispatch, clientId]);

  const filteredLocations = locations.filter(
    (location: Location) =>
      (location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (location.city && location.city.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (tabValue === 0 || (tabValue === 1 && location.isDropoffSite))
  );

  return {
    locations,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    tabValue,
    setTabValue,
    filteredLocations,
  };
};