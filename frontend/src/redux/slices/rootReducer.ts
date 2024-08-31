import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import brandingReducer from './brandingSlice';
import cateringOrderReducer from './CateringOrderSlice';
import clientReducer from './clientSlice';
import dashboardReducer from './dashboardSlice';
import discountReducer from './discountSlice';
import inventoryReducer from './inventorySlice';
import locationReducer from './locationSlice';
import loyaltyReducer from './loyaltySlice';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';
import posProfileReducer from './posProfileSlice';
import providerReducer from './providerSlice';
import roleReducer from './roleSlice';
import serviceFeeReducer from './serviceFeeSlice';
import userReducer from './userSlice';
import walletReducer from './walletSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  branding: brandingReducer,
  cateringOrders: cateringOrderReducer,
  clients: clientReducer,
  dashboard: dashboardReducer,
  discounts: discountReducer,
  inventory: inventoryReducer,
  locations: locationReducer,
  loyalty: loyaltyReducer,
  menu: menuReducer,
  orders: orderReducer,
  posProfiles: posProfileReducer,
  providers: providerReducer,
  roles: roleReducer,
  serviceFees: serviceFeeReducer,
  user: userReducer,
  wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
