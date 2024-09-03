import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  updatePOSSettings,
  fetchPOSSettings,
} from '../redux/slices/posSettingsSlice';

const POSSettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { settings, error } = useSelector((state: RootState) => state.posSettings);
  const [modifierSendMethod, setModifierSendMethod] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchPOSSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings?.modifierSendMethod) {
      setModifierSendMethod(settings.modifierSendMethod);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await dispatch(updatePOSSettings({ modifierSendMethod })).unwrap();
      alert('Settings updated successfully');
    } catch (err) {
      alert('Failed to update settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="pos-settings-page">
      <h2>POS Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="modifierSendMethod">Modifier Send Method:</label>
          <select
            id="modifierSendMethod"
            value={modifierSendMethod}
            onChange={(e) => setModifierSendMethod(e.target.value)}
          >
            <option value="list">Send as List</option>
            <option value="individual">Send Individually</option>
          </select>
        </div>
        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default POSSettingsPage;