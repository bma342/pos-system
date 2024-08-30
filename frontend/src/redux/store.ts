import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkAction } from 'redux-thunk';

import clientReducer from './slices/clientSlice';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import posProfileReducer from './slices/posProfileSlice';
import authReducer from './slices/authSlice';
import locationReducer from './slices/locationSlice';
import serviceFeeReducer from './slices/serviceFeeSlice';
import discountReducer from './slices/discountSlice';
import providerReducer from './slices/providerSlice';
import brandingReducer from './slices/brandingSlice';
import roleReducer from './slices/roleSlice';
import cateringOrderReducer from './slices/CateringOrderSlice';
import userReducer from './slices/userSlice';
import inventoryReducer from './slices/inventorySlice';
import dashboardReducer from './slices/dashboardSlice';
import walletReducer from './slices/walletSlice';
import loyaltyReducer from './slices/loyaltySlice';
import guestReducer from './slices/guestSlice';
import cartReducer from './slices/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'],
};

const rootReducer = combineReducers({
  client: clientReducer,
  menu: menuReducer,
  cart: cartReducer,
  order: orderReducer,
  posProfiles: posProfileReducer,
  auth: authReducer,
  locations: locationReducer,
  serviceFees: serviceFeeReducer,
  discounts: discountReducer,
  providers: providerReducer,
  branding: brandingReducer,
  roles: roleReducer,
  cateringOrders: cateringOrderReducer,
  user: userReducer,
  inventory: inventoryReducer,
  dashboard: dashboardReducer,
  wallet: walletReducer,
  loyalty: loyaltyReducer,
  guest: guestReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
