import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Import all reducers
import authReducer from './slices/authSlice';
import clientConfigReducer from './slices/clientConfigSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import locationReducer from './slices/locationSlice';
import loyaltyReducer from './slices/loyaltySlice';
import posProfileReducer from './slices/posProfileSlice';
import posSettingsReducer from './slices/posSettingsSlice';
import dashboardReducer from './slices/dashboardSlice';
import serviceFeeReducer from './slices/serviceFeeSlice';
import walletReducer from './slices/walletSlice';
import discountReducer from './slices/discountSlice';
import revenueReducer from './slices/revenueSlice';
import inventoryReducer from './slices/inventorySlice';
import clientBrandingReducer from './slices/clientBrandingSlice';
import realtimeMetricsReducer from './slices/realtimeMetricsSlice';
import reviewReducer from './slices/reviewSlice';
import settingsReducer from './slices/settingsSlice';
import abTestReducer from './slices/abTestSlice';
import auditLogReducer from './slices/auditLogSlice';
import brandingReducer from './slices/brandingSlice';
import cateringOrderReducer from './slices/cateringOrderSlice';
import challengeReducer from './slices/challengeSlice';
import customerReducer from './slices/customerSlice';
import guestReducer from './slices/guestSlice';
import menuItemsReducer from './slices/menuItemsSlice';
import posIntegrationReducer from './slices/posIntegrationSlice';
import providerReducer from './slices/providerSlice';
import roleReducer from './slices/roleSlice';
import salesReportReducer from './slices/salesReportSlice';
import sessionReducer from './slices/sessionSlice';
import ordersReducer from './slices/orderSlice';
import clientReducer from './slices/clientSlice';
import locationReducer from './slices/locationSlice';

// Configure persist options
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'clientConfig', 'user', 'cart', 'location', 'loyalty', 'wallet'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  clientConfig: clientConfigReducer,
  user: userReducer,
  cart: cartReducer,
  menu: menuReducer,
  order: orderReducer,
  location: locationReducer,
  loyalty: loyaltyReducer,
  posProfile: posProfileReducer,
  posSettings: posSettingsReducer,
  dashboard: dashboardReducer,
  serviceFee: serviceFeeReducer,
  wallet: walletReducer,
  discount: discountReducer,
  revenue: revenueReducer,
  inventory: inventoryReducer,
  clientBranding: clientBrandingReducer,
  realtimeMetrics: realtimeMetricsReducer,
  review: reviewReducer,
  settings: settingsReducer,
  abTest: abTestReducer,
  auditLog: auditLogReducer,
  branding: brandingReducer,
  cateringOrder: cateringOrderReducer,
  challenge: challengeReducer,
  customer: customerReducer,
  guest: guestReducer,
  menuItems: menuItemsReducer,
  posIntegration: posIntegrationReducer,
  provider: providerReducer,
  role: roleReducer,
  salesReport: salesReportReducer,
  session: sessionReducer,
  orders: ordersReducer,
  client: clientReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false,
});

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    location: locationReducer,
    abTest: abTestReducer,
    client: clientReducer,
    location: locationReducer,
    menuItems: menuItemsReducer,
    clientBranding: clientBrandingReducer,
    abTest: abTestReducer,
    session: sessionReducer,
    auth: authReducer,
    serviceFee: serviceFeeReducer,
    wallet: walletReducer
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export interface RootState {
  location: LocationState;
  posIntegration: PosIntegrationState;
  // ... other slices
}

export interface LocationState {
  locationProfiles: LocationProfile[];
  // ... other location state properties
}

export interface PosIntegrationState {
  integrations: PosIntegration[];
  // ... other POS integration state properties
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
