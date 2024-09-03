import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  updatePOSSettings,
  fetchPOSSettings,
} from '../redux/slices/posSettingsSlice';

const POSSettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posSettings = useSelector((state: RootState) => state.posSettings);
  const [modifierSendMethod, setModifierSendMethod] = useState('');

  useEffect(() => {
    dispatch(fetchPOSSettings());
  }, [dispatch]);

  useEffect(() => {
    if (posSettings.modifierSendMethod) {
      setModifierSendMethod(posSettings.modifierSendMethod);
    }
  }, [posSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updatePOSSettings({ modifierSendMethod }));
  };

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
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default POSSettingsPage;
