import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateClientStatus } from '../redux/slices/clientSlice';
import { AppDispatch } from '../redux/store';

const ClientSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: RootState) => state.client);
  const [status, setStatus] = useState(client.status);

  const handleUpdateStatus = () => {
    dispatch(updateClientStatus(status));
  };

  return (
    <div>
      <h2>Client Settings</h2>
      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as 'idle' | 'loading' | 'failed' | 'succeeded'
          )
        }
      >
        <option value="idle">Idle</option>
        <option value="loading">Loading</option>
        <option value="failed">Failed</option>
        <option value="succeeded">Succeeded</option>
      </select>
      <button onClick={handleUpdateStatus}>Update Status</button>
      <p>Current Status: {client.status}</p>
    </div>
  );
};

export default ClientSettings;
