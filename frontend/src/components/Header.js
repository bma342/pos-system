import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-primary">Restaurant Name</h1>
        <nav className="hidden md:flex space-x-4 font-secondary">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/menu" className="hover:text-accent">Menu</Link>
          <Link to="/cart" className="hover:text-accent">Cart</Link>
          <Link to="/orders" className="hover:text-accent">My Orders</Link>
        </nav>
        <button className="md:hidden">
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
