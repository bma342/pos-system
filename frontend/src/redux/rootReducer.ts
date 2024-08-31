import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import locationReducer from './slices/locationSlice';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import loyaltyReducer from './slices/loyaltySlice';
import posIntegrationReducer from './slices/posIntegrationSlice';
import userReducer from './slices/userSlice';
import walletReducer from './slices/walletSlice';
import discountReducer from './slices/discountSlice';
import serviceFeeReducer from './slices/serviceFeeSlice';
import posProfileReducer from './slices/posProfileSlice';
import providerReducer from './slices/providerSlice';
import reviewReducer from './slices/reviewSlice';
import roleReducer from './slices/roleSlice';
import guestReducer from './slices/guestSlice';
import dashboardReducer from './slices/dashboardSlice';
import cateringOrderReducer from './slices/CateringOrderSlice';
import inventoryReducer from './slices/inventorySlice';
import realtimeMetricsReducer from './slices/realtimeMetricsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  location: locationReducer,
  menu: menuReducer,
  order: orderReducer,
  loyalty: loyaltyReducer,
  posIntegration: posIntegrationReducer,
  user: userReducer,
  wallet: walletReducer,
  discount: discountReducer,
  serviceFee: serviceFeeReducer,
  posProfile: posProfileReducer,
  provider: providerReducer,
  review: reviewReducer,
  role: roleReducer,
  guest: guestReducer,
  dashboard: dashboardReducer,
  cateringOrder: cateringOrderReducer,
  inventory: inventoryReducer,
  realtimeMetrics: realtimeMetricsReducer,
});

export default rootReducer;
