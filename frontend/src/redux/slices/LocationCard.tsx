import React from 'react';

interface LocationCardProps {
  name: string;
  address: string;
  imageUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  address,
  imageUrl,
}) => {
  return (
    <div className="location-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{address}</p>
    </div>
  );
};

export default LocationCard;
