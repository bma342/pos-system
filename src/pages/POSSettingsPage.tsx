import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  fetchPOSSettings,
  updatePOSSettings,
  selectPOSSettings,
  selectPOSSettingsStatus,
} from '../redux/slices/posSettingsSlice';

const POSSettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posSettings = useSelector(selectPOSSettings);
  const status = useSelector(selectPOSSettingsStatus);
  const [modifierSendMethod, setModifierSendMethod] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPOSSettings());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (posSettings) {
      setModifierSendMethod(posSettings.modifierSendMethod || '');
    }
  }, [posSettings]);

  const handleSaveSettings = () => {
    dispatch(updatePOSSettings({ modifierSendMethod }));
  };

  if (status === 'loading') {
    return <div>Loading POS settings...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading POS settings. Please try again.</div>;
  }

  return (
    <div>
      <h1>POS Settings</h1>
      <div>
        <label htmlFor="modifierSendMethod">Modifier Send Method:</label>
        <select
          id="modifierSendMethod"
          value={modifierSendMethod}
          onChange={(e) => setModifierSendMethod(e.target.value)}
        >
          <option value="individual">Individual</option>
          <option value="grouped">Grouped</option>
        </select>
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default POSSettingsPage;