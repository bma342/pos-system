import React from 'react';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const distanceAway = '5 miles'; // Placeholder - replace with dynamic calculation

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={location.client.branding?.logoUrl || '/placeholder-logo.png'}
        alt={`${location.displayName} logo`}
        className="w-full h-32 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{location.displayName}</h2>
      <p>{location.address}</p>
      <p>Distance: {distanceAway}</p>
      <p>Open Now: {location.isOpen ? 'Yes' : 'No'}</p>
      <p>Wait Time: {location.waitTime}</p>
      <p>Options: {location.diningOptions.join(', ')}</p>
      <Link
        to={`/locations/${location.id}`}
        className="mt-4 inline-block bg-green-500 text-white p-2 rounded"
      >
        Select
      </Link>
    </div>
  );
};

export default LocationCard;
