import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // This import is correct
import abTestReducer from './abTestSlice';
import clientBrandingReducer from './clientBrandingSlice';
import clientConfigReducer from './clientConfigSlice';
import clientReducer from './clientSlice';
import walletReducer from './walletSlice';
import roleReducer from './roleSlice';
import locationReducer from './locationSlice';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';
import loyaltyReducer from './loyaltySlice';
import posIntegrationReducer from './posIntegrationSlice';
import userReducer from './userSlice';
import discountReducer from './discountSlice';
import serviceFeeReducer from './serviceFeeSlice';
import posProfileReducer from './posProfileSlice';
import providerReducer from './providerSlice';
import reviewReducer from './reviewSlice';
import guestReducer from './guestSlice';
import dashboardReducer from './dashboardSlice';
import cateringOrderReducer from './cateringOrderSlice';
import inventoryReducer from './inventorySlice';
import realtimeMetricsReducer from './realtimeMetricsSlice';

const rootReducer = combineReducers({
  auth: authSlice, // Remove .reducer, authSlice is already a reducer
  abTest: abTestReducer,
  clientBranding: clientBrandingReducer,
  clientConfig: clientConfigReducer,
  client: clientReducer,
  wallet: walletReducer,
  role: roleReducer,
  location: locationReducer,
  menu: menuReducer,
  order: orderReducer,
  loyalty: loyaltyReducer,
  posIntegration: posIntegrationReducer,
  user: userReducer,
  discount: discountReducer,
  serviceFee: serviceFeeReducer,
  posProfile: posProfileReducer,
  provider: providerReducer,
  review: reviewReducer,
  guest: guestReducer,
  dashboard: dashboardReducer,
  cateringOrder: cateringOrderReducer,
  inventory: inventoryReducer,
  realtimeMetrics: realtimeMetricsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
