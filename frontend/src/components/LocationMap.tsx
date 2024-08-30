import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';

interface LocationMapProps {
  locations: Location[];
}

const SetViewOnClick: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({ locations }) => {
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default to London if no locations

  const mapCenter: [number, number] =
    locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : defaultPosition;

  return (
    <MapContainer style={{ height: '400px', width: '100%' }}>
      <SetViewOnClick center={mapCenter} zoom={13} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <b>{location.name}</b>
            <br />
            {location.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;
