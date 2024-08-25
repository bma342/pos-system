import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../redux/slices/locationSlice';
import LocationCard from './LocationCard';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

const LocationSelectionPage = () => {
  const dispatch = useDispatch();
  const { locations, status } = useSelector((state) => state.locations);
  const { user } = useSelector((state) => state.auth); // Assuming you have an auth slice that stores the user info
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading locations...</p>;
  if (status === 'failed') return <p>Failed to load locations.</p>;

  const clientBranding = locations.length > 0 ? locations[0].clientBranding : {}; // Assume branding data is included

  const pageStyle = {
    backgroundColor: clientBranding.backgroundColor || '#fff',
    color: clientBranding.fontColor || '#000',
    fontFamily: clientBranding.font || 'Arial, sans-serif',
  };

  return (
    <div className="container mx-auto p-4" style={pageStyle}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Select a Location</h1>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
          {user && user.role && ['Admin', 'Manager', 'SuperAdmin'].includes(user.role) && (
            <Link
              to="/admin/dashboard"
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
    </div>
  );
};

export default LocationSelectionPage;
