import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDiscounts from './pages/AdminDiscounts';
import AdminLoyaltyManagement from './pages/AdminLoyaltyManagement';
import AdminLoyaltyRewards from './pages/AdminLoyaltyRewards';
import BrandingSettings from './pages/BrandingSettings';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ClientSettings from './pages/ClientSettings';
import GuestProfile from './pages/GuestProfile';
import Inventory from './pages/Inventory';
import LocationManagement from './pages/LocationManagement';
import Menu from './pages/Menu';
import MenuBuilder from './pages/MenuBuilder';
import OrderPage from './pages/OrderPage';
import OrderScheduling from './pages/OrderScheduling';
import PosProfilePage from './pages/PosProfilePage';
import ProfilePage from './pages/ProfilePage';
import Wallet from './pages/Wallet';
import ClientLocationsPage from './pages/ClientLocationsPage';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin/discounts" element={<AdminDiscounts />} />
        <Route path="admin/loyalty" element={<AdminLoyaltyManagement />} />
        <Route path="admin/loyalty-rewards" element={<AdminLoyaltyRewards />} />
        <Route path="admin/branding" element={<BrandingSettings />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="client-settings" element={<ClientSettings />} />
        <Route path="guest-profile" element={<GuestProfile />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="location-management" element={<LocationManagement />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu-builder" element={<MenuBuilder />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="order-scheduling" element={<OrderScheduling />} />
        <Route path="pos-profile" element={<PosProfilePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="wallet" element={<Wallet />} />
        <Route
          path="client/:clientId/locations"
          element={<ClientLocationsPage />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
