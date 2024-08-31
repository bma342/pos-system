import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AdminPanel from './components/admin/AdminPanel';
import Menu from './components/guest/Menu';
import Cart from './components/guest/Cart';
import Checkout from './components/guest/Checkout';
import Login from './components/Login';
const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            user && user.roles.includes('clientAdmin') ? (
              <AdminPanel />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/menu/:locationId" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
