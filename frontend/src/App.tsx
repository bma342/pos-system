import React, { Suspense, lazy } from 'react';
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

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const AdminDiscounts = lazy(() => import('./pages/AdminDiscounts'));
const AdminLoyaltyManagement = lazy(
  () => import('./pages/AdminLoyaltyManagement')
);
const AdminLoyaltyRewards = lazy(() => import('./pages/AdminLoyaltyRewards'));
const BrandingSettings = lazy(() => import('./pages/BrandingSettings'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ClientSettings = lazy(() => import('./pages/ClientSettings'));
const GuestProfile = lazy(() => import('./pages/GuestProfile'));
const Inventory = lazy(() => import('./pages/Inventory'));
const LocationManagement = lazy(() => import('./pages/LocationManagement'));
const Menu = lazy(() => import('./pages/Menu'));
const MenuBuilder = lazy(() => import('./pages/MenuBuilder'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const OrderScheduling = lazy(() => import('./pages/OrderScheduling'));
const PosProfilePage = lazy(() => import('./pages/PosProfilePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const Wallet = lazy(() => import('./pages/Wallet'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <ClientProvider>
            <Router>
              <Navbar />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<PrivateRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="admin">
                      <Route path="discounts" element={<AdminDiscounts />} />
                      <Route
                        path="loyalty"
                        element={<AdminLoyaltyManagement />}
                      />
                      <Route
                        path="loyalty-rewards"
                        element={<AdminLoyaltyRewards />}
                      />
                      <Route
                        path="client-settings"
                        element={<ClientSettings />}
                      />
                    </Route>
                    <Route path="branding" element={<BrandingSettings />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="guest-profile" element={<GuestProfile />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route
                      path="location-management"
                      element={<LocationManagement />}
                    />
                    <Route path="menu" element={<Menu />} />
                    <Route path="menu-builder" element={<MenuBuilder />} />
                    <Route path="orders" element={<OrderPage />} />
                    <Route
                      path="order-scheduling"
                      element={<OrderScheduling />}
                    />
                    <Route path="pos-profile" element={<PosProfilePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="wallet" element={<Wallet />} />
                  </Route>
                </Routes>
              </Suspense>
            </Router>
            <ToastContainer position="bottom-right" />
          </ClientProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
