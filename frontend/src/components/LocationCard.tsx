import React from 'react';
import { Link } from 'react-router-dom';

interface LocationProps {
  location: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
  };
}

const LocationCard: React.FC<LocationProps> = ({ location }) => {
  return (
    <div className="location-card">
      <h2>{location.name}</h2>
      <p>{location.address}</p>
      <p>{`${location.city}, ${location.state} ${location.zipCode}`}</p>
      <p>Phone: {location.phoneNumber}</p>
      <p>Email: {location.email}</p>
      <Link to={`/client/${location.id}/order`}>Place Order</Link>
      <Link to={`/client/${location.id}/loyalty`}>Loyalty Program</Link>
    </div>
  );
};

export default LocationCard;
