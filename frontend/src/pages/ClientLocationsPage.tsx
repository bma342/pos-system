import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LocationCard from '../components/LocationCard';
import { Location } from '../types';

const ClientLocationsPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<Location[]>(
          `/api/clients/${clientId}/locations`
        );
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [clientId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Client Locations</h1>
      <div className="location-list">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
      >
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={
            locations.length > 0
              ? { lat: locations[0].latitude, lng: locations[0].longitude }
              : { lat: 0, lng: 0 }
          }
          zoom={10}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ClientLocationsPage;
