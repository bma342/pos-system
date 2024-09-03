import React from 'react';
import { Location } from '../types';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div>
      <h2>{location.name}</h2>
      <p>{location.address}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default LocationCard;
