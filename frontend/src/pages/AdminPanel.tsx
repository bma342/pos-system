import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchClientConfig, selectClientConfig, selectClientConfigStatus, selectClientConfigError } from '../redux/slices/clientConfigSlice';

interface AdminPanelProps {
  isGlobalAdmin: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isGlobalAdmin }) => {
  const dispatch = useAppDispatch();
  const clientConfig = useAppSelector(selectClientConfig);
  const status = useAppSelector(selectClientConfigStatus);
  const error = useAppSelector(selectClientConfigError);

  React.useEffect(() => {
    if (isGlobalAdmin) {
      dispatch(fetchClientConfig('global'));
    }
  }, [dispatch, isGlobalAdmin]);

  return (
    <div>
      <h1>{isGlobalAdmin ? 'Global Admin Panel' : 'Admin Panel'}</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && clientConfig && (
        <div>
          <h2>Client Configuration</h2>
          <pre>{JSON.stringify(clientConfig, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
