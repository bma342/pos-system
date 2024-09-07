import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserRole } from './types/userTypes';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import GuestLandingPage from './pages/GuestLandingPage';
import Login from './pages/Login';
import Menu from './pages/Menu';
import OrderConfirmation from './pages/OrderConfirmation';
import LocationManagement from './pages/LocationManagement';
import MenuBuilder from './pages/MenuBuilder';
import OrderPage from './pages/OrderPage';
import OrderScheduling from './pages/OrderScheduling';
import PosProfilePage from './pages/PosProfilePage';
import ProfilePage from './pages/ProfilePage';
import Wallet from './pages/Wallet';
import ClientLocationsPage from './pages/ClientLocationsPage';
import ABTestManagement from './pages/ABTestManagement';
import AdminDashboard from './pages/AdminDashboard';
import AdminDiscounts from './pages/AdminDiscounts';
import AdminLocationManagement from './pages/AdminLocationManagement';
import AdminLoyaltyManagement from './pages/AdminLoyaltyManagement';
import AdminLoyaltyRewards from './pages/AdminLoyaltyRewards';
import AdminMenuManagement from './pages/AdminMenuManagement';
import AdminWalletManagement from './pages/AdminWalletManagement';
import BrandingManagement from './pages/BrandingManagement';
import BrandingSettings from './pages/BrandingSettings';
import BusinessAdminDashboard from './pages/BusinessAdminDashboard';
import CateringMenuItems from './pages/CateringMenuItems';
import CateringMenus from './pages/CateringMenus';
import CateringOrderAssignments from './pages/CateringOrderAssignments';
import CateringOrders from './pages/CateringOrders';
import ClientSettings from './pages/ClientSettings';
import GlobalAdminDashboard from './pages/GlobalAdminDashboard';
import GuestMenuPage from './pages/GuestMenuPage';
import GuestProfile from './pages/GuestProfile';
import HomePage from './pages/HomePage';
import Inventory from './pages/Inventory';
import InventoryManagement from './pages/InventoryManagement';
import LoyaltyManagement from './pages/LoyaltyManagement';
import MenuManagementAdmin from './pages/MenuManagementAdmin';
import MenuPage from './pages/MenuPage';
import POSSettingsPage from './pages/PosSettingsPage';
import Register from './pages/Register';
import ReportingDashboard from './pages/ReportingDashboard';
import UserManagement from './pages/UserManagement';
import AdminPanel from './pages/AdminPanel'; // Add this import

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu/:locationId" element={<Menu />} />
      <Route
        path="/order-confirmation/:orderId"
        element={<OrderConfirmation />}
      />
      <Route path="/guest-menu" element={<GuestMenuPage />} />
      <Route path="/home" element={<HomePage />} />

      <Route
        element={
          <PrivateRoute
            allowedRoles={[
              UserRole.GUEST,
              UserRole.CLIENT_ADMIN,
              UserRole.GLOBAL_ADMIN,
            ]}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/guest-profile" element={<GuestProfile />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-scheduling" element={<OrderScheduling />} />
      </Route>

      <Route
        element={
          <PrivateRoute
            allowedRoles={[UserRole.CLIENT_ADMIN, UserRole.GLOBAL_ADMIN]}
          />
        }
      >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/business-admin-dashboard"
          element={<BusinessAdminDashboard />}
        />
        <Route path="/locations" element={<AdminLocationManagement />} />
        <Route path="/menu-management" element={<AdminMenuManagement />} />
        <Route path="/menu-builder" element={<MenuBuilder />} />
        <Route
          path="/loyalty-management"
          element={<AdminLoyaltyManagement />}
        />
        <Route path="/loyalty-rewards" element={<AdminLoyaltyRewards />} />
        <Route path="/discounts" element={<AdminDiscounts />} />
        <Route path="/wallet-management" element={<AdminWalletManagement />} />
        <Route path="/branding-management" element={<BrandingManagement />} />
        <Route path="/branding-settings" element={<BrandingSettings />} />
        <Route path="/catering-menus" element={<CateringMenus />} />
        <Route path="/catering-menu-items" element={<CateringMenuItems />} />
        <Route path="/catering-orders" element={<CateringOrders />} />
        <Route
          path="/catering-order-assignments"
          element={<CateringOrderAssignments />}
        />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/pos-settings" element={<POSSettingsPage />} />
        <Route path="/pos-profile" element={<PosProfilePage />} />
        <Route path="/reporting" element={<ReportingDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/ab-test-management" element={<ABTestManagement />} />
        <Route path="/client-locations" element={<ClientLocationsPage />} />
        <Route path="/client-settings" element={<ClientSettings />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={[UserRole.GLOBAL_ADMIN]} />}>
        <Route
          path="/global-admin"
          element={<AdminPanel />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;