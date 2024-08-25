import React from 'react';

interface Location {
  id: number;
  name: string;
}

interface LocationSelectionPageProps {
  locations: Location[];
  onSelectLocation: (id: number) => void;
}

const LocationSelectionPage: React.FC<LocationSelectionPageProps> = ({
  locations,
  onSelectLocation,
}) => {
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelectLocation(id);
    }
  };

  return (
    <div className="location-selection-page">
      <h2>Select a Location</h2>
      <ul>
        {locations.map((location) => (
          <div
            key={location.id}
            tabIndex={0}
            role="button"
            onClick={() => onSelectLocation(location.id)}
            onKeyPress={(e) => handleKeyPress(e, location.id)}
          >
            {location.name}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LocationSelectionPage;
