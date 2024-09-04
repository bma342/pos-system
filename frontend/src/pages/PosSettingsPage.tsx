import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPOSSettings, updatePOSSettings, selectPOSSettingsForLocation } from '../redux/slices/posSettingsSlice';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { POSSettings } from '../types/posSettingsTypes';

const PosSettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const posSettings = useSelector((state: RootState) => 
    selectedLocation ? selectPOSSettingsForLocation(state, selectedLocation) : null
  );
  const [localSettings, setLocalSettings] = useState<Partial<POSSettings>>({});

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchPOSSettings(selectedLocation));
    }
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    if (posSettings) {
      setLocalSettings(posSettings);
    }
  }, [posSettings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setLocalSettings(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleCustomSettingChange = (key: string, value: string | number | boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      customSettings: {
        ...prev.customSettings,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocation) {
      dispatch(updatePOSSettings({ locationId: selectedLocation, settings: localSettings }));
    }
  };

  if (!posSettings) {
    return <div>Loading POS settings...</div>;
  }

  return (
    <div>
      <h1>POS Settings for {selectedLocation}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>POS System: {posSettings.posSystem}</label>
        </div>
        <div>
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={localSettings.apiKey || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="apiEndpoint">API Endpoint:</label>
          <input
            type="text"
            id="apiEndpoint"
            name="apiEndpoint"
            value={localSettings.apiEndpoint || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="syncFrequency">Sync Frequency (minutes):</label>
          <input
            type="number"
            id="syncFrequency"
            name="syncFrequency"
            value={localSettings.syncFrequency || 0}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="menuSyncEnabled">Menu Sync Enabled:</label>
          <input
            type="checkbox"
            id="menuSyncEnabled"
            name="menuSyncEnabled"
            checked={localSettings.menuSyncEnabled || false}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="inventorySyncEnabled">Inventory Sync Enabled:</label>
          <input
            type="checkbox"
            id="inventorySyncEnabled"
            name="inventorySyncEnabled"
            checked={localSettings.inventorySyncEnabled || false}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="orderSyncEnabled">Order Sync Enabled:</label>
          <input
            type="checkbox"
            id="orderSyncEnabled"
            name="orderSyncEnabled"
            checked={localSettings.orderSyncEnabled || false}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Sync: {posSettings.lastSyncTimestamp ? new Date(posSettings.lastSyncTimestamp).toLocaleString() : 'Never'}</label>
        </div>
        <h2>Custom Settings</h2>
        {Object.entries(posSettings.customSettings || {}).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type={typeof value === 'boolean' ? 'checkbox' : 'text'}
              id={key}
              name={key}
              value={typeof value !== 'boolean' ? value : undefined}
              checked={typeof value === 'boolean' ? value : undefined}
              onChange={(e) => handleCustomSettingChange(key, e.target.type === 'checkbox' ? e.target.checked : e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Save POS Settings</button>
      </form>
    </div>
  );
};

export default PosSettingsPage;