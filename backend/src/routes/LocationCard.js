import React from 'react';

const LocationCard = ({ location }) => {
  const { clientBranding } = location; // Assume branding info is passed within the location data

  const cardStyle = {
    borderColor: clientBranding.primaryColor || '#000',
    color: clientBranding.fontColor || '#000',
    fontFamily: clientBranding.font || 'Arial, sans-serif',
  };

  return (
    <div className="bg-white shadow rounded-lg p-4" style={cardStyle}>
      <h2 className="text-xl font-bold">{location.name}</h2>
      <p>{location.address}</p>
      <p>Open: {location.isOpen ? 'Yes' : 'No'}</p>
      <p>Current Wait Time: {location.waitTime} mins</p>
      <p>Distance: {location.distance} miles</p>
      <p>Options: {location.diningOptions.join(', ')}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
        style={{ backgroundColor: clientBranding.secondaryColor || '#28a745' }}
      >
        Start Order
      </button>
    </div>
  );
};

export default LocationCard;
