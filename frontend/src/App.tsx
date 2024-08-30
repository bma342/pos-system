import React, { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';
import { ClientProvider } from './context/ClientContext';
import theme from './theme';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const lazyLoad = (path: string) => lazy(() => import(`./pages/${path}`));

const components = {
  Dashboard: lazyLoad('Dashboard'),
  Login: lazyLoad('Login'),
  AdminDiscounts: lazyLoad('AdminDiscounts'),
  AdminLoyaltyManagement: lazyLoad('AdminLoyaltyManagement'),
  AdminLoyaltyRewards: lazyLoad('AdminLoyaltyRewards'),
  BrandingSettings: lazyLoad('BrandingSettings'),
  CartPage: lazyLoad('CartPage'),
  CheckoutPage: lazyLoad('CheckoutPage'),
  ClientSettings: lazyLoad('ClientSettings'),
  GuestProfile: lazyLoad('GuestProfile'),
  Inventory: lazyLoad('Inventory'),
  LocationManagement: lazyLoad('LocationManagement'),
  Menu: lazyLoad('Menu'),
  MenuBuilder: lazyLoad('MenuBuilder'),
  OrderPage: lazyLoad('OrderPage'),
  OrderScheduling: lazyLoad('OrderScheduling'),
  PosProfilePage: lazyLoad('PosProfilePage'),
  ProfilePage: lazyLoad('ProfilePage'),
  Wallet: lazyLoad('Wallet'),
  ClientLocationsPage: lazyLoad('ClientLocationsPage'),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: React.FC = () => {
  const routes = useMemo(
    () => (
      <Routes>
        <Route path="/login" element={<components.Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<components.Dashboard />} />
          <Route path="admin">
            <Route path="discounts" element={<components.AdminDiscounts />} />
            <Route
              path="loyalty"
              element={<components.AdminLoyaltyManagement />}
            />
            <Route
              path="loyalty-rewards"
              element={<components.AdminLoyaltyRewards />}
            />
            <Route
              path="client-settings"
              element={<components.ClientSettings />}
            />
          </Route>
          <Route path="branding" element={<components.BrandingSettings />} />
          <Route path="cart" element={<components.CartPage />} />
          <Route path="checkout" element={<components.CheckoutPage />} />
          <Route path="guest-profile" element={<components.GuestProfile />} />
          <Route path="inventory" element={<components.Inventory />} />
          <Route
            path="location-management"
            element={<components.LocationManagement />}
          />
          <Route path="menu" element={<components.Menu />} />
          <Route path="menu-builder" element={<components.MenuBuilder />} />
          <Route path="orders" element={<components.OrderPage />} />
          <Route
            path="order-scheduling"
            element={<components.OrderScheduling />}
          />
          <Route path="pos-profile" element={<components.PosProfilePage />} />
          <Route path="profile" element={<components.ProfilePage />} />
          <Route path="wallet" element={<components.Wallet />} />
        </Route>
        <Route
          path="/client/:clientId/locations"
          element={<components.ClientLocationsPage />}
        />
      </Routes>
    ),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <ClientProvider>
            <Router>
              <Navbar />
              <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
            </Router>
            <ToastContainer position="bottom-right" />
          </ClientProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default React.memo(App);
