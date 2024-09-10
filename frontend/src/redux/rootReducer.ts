import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import abTestReducer from './slices/abTestSlice';
import clientBrandingReducer from './slices/clientBrandingSlice';
import clientConfigReducer from './slices/clientConfigSlice';
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
import revenueReducer from './slices/revenueSlice';
import dashboardReducer from './slices/dashboardSlice';
import cateringOrderReducer from './slices/cateringOrderSlice';
import inventoryReducer from './slices/inventorySlice';
import realtimeMetricsReducer from './slices/realtimeMetricsSlice';
import posSettingsReducer from './slices/posSettingsSlice';
import cartReducer from './slices/cartSlice';
import menuItemsReducer from './slices/menuItemsSlice';
import brandingReducer from './slices/brandingSlice';
import settingsReducer from './slices/settingsSlice';
import analyticsReducer from './slices/analyticsSlice';
import metricsReducer from './slices/metricsSlice';
import posDiscountReducer from './slices/posDiscountSlice';
import posAlertsReducer from './slices/posAlertsSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  location: locationReducer,
  auth: authReducer,
  abTest: abTestReducer,
  clientBranding: clientBrandingReducer,
  clientConfig: clientConfigReducer,
  clients: clientReducer,
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
  revenue: revenueReducer,
  dashboard: dashboardReducer,
  cateringOrder: cateringOrderReducer,
  inventory: inventoryReducer,
  realtimeMetrics: realtimeMetricsReducer,
  posSettings: posSettingsReducer,
  cart: cartReducer,
  menuItems: menuItemsReducer,
  branding: brandingReducer,
  analytics: analyticsReducer,
  metrics: metricsReducer,
  posDiscount: posDiscountReducer,
  posAlerts: posAlertsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
