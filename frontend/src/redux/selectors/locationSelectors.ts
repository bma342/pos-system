import { RootState } from '../store';

export const selectSelectedLocation = (state: RootState) => state.location.selectedLocation;