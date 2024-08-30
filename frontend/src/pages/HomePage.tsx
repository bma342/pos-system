import React from 'react';
import Navbar from '../components/layout/Navbar';
import LocationList from '../components/LocationList';
import LocationMap from '../components/LocationMap';
import LoginForm from '../components/LoginForm';
import { Location } from '../types';

const HomePage: React.FC = () => {
  // This should be replaced with actual data fetching logic
  const locations: Location[] = [];

  return (
    <div>
      <Navbar />
      <header className="bg-gray-800 text-white text-center py-6">
        <h1 className="text-4xl font-bold">Welcome to Our POS System</h1>
        <p className="text-lg mt-2">
          Manage your orders, view locations, and much more.
        </p>
      </header>
      <div className="container mx-auto py-8 px-4">
        <LoginForm />
        <h2 className="text-3xl font-semibold mb-4">Our Locations</h2>
        <LocationList />
        <LocationMap locations={locations} />
      </div>
    </div>
  );
};

export default HomePage;
