import React from 'react';
import { Location } from '../types/locationTypes';

interface Props {
  locations: Location[];
  onStatusChange: (locationId: number, isOpen: boolean) => void;
}

const DetailedLocationView: React.FC<Props> = ({
  locations,
  onStatusChange,
}) => {
  return (
    <div className="detailed-location-view">
      <h3>Detailed Location View</h3>
      {locations.map((location) => (
        <div key={location.id} className="location-card">
          <h4>{location.name}</h4>
          <p>Address: {location.address}</p>
          <p>Status: {location.isOpen ? 'Open' : 'Closed'}</p>
          <button onClick={() => onStatusChange(location.id, !location.isOpen)}>
            {location.isOpen ? 'Close' : 'Open'}
          </button>
          {location.isUsingNonStandardHours && <p>Using non-standard hours</p>}
          <p>Phone: {location.phoneNumber}</p>
          <p>Email: {location.email}</p>
          <p>City: {location.city}</p>
          <p>State: {location.state}</p>
          <p>Zip Code: {location.zipCode}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailedLocationView;
