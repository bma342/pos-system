import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import ordersReducer from './redux/slices/orderSlice';
import rolesReducer from './redux/slices/roleSlice';
import clientsReducer from './redux/slices/clientSlice';
import locationsReducer from './redux/slices/locationSlice';
import menuReducer from './redux/slices/menuSlice';
import serviceFeesReducer from './redux/slices/serviceFeeSlice';
import brandingReducer from './redux/slices/brandingSlice';
import posProfilesReducer from './redux/slices/posProfileSlice';
import loyaltyReducer from './redux/slices/loyaltySlice';
import walletReducer from './redux/slices/walletSlice';
import cartReducer from './redux/slices/cartSlice'; // Fixed the import path

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  roles: rolesReducer,
  clients: clientsReducer,
  locations: locationsReducer,
  menu: menuReducer,
  serviceFees: serviceFeesReducer,
  branding: brandingReducer,
  posProfiles: posProfilesReducer,
  cart: cartReducer,
  loyalty: loyaltyReducer,
  wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
