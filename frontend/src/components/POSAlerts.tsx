import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { POSAlert } from '../types';

const POSAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<POSAlert[]>([]);
  const posProfiles = useSelector(
    (state: RootState) => state.posProfiles.profiles
  );

  useEffect(() => {
    // In a real application, you would fetch alerts from an API
    // For now, we'll simulate some alerts
    const simulatedAlerts: POSAlert[] = [
      {
        id: 1,
        posProfileId: 1,
        errorCode: 'E001',
        message: 'Connection lost',
        timestamp: new Date(),
      },
      {
        id: 2,
        posProfileId: 2,
        errorCode: 'E002',
        message: 'Sync failed',
        timestamp: new Date(),
      },
    ];
    setAlerts(simulatedAlerts);
  }, []);

  const getAlertSeverity = (errorCode: string, posProfileId: number) => {
    const profile = posProfiles.find((p) => p.id === posProfileId);
    if (!profile) return 'unknown';

    switch (profile.provider) {
      case 'Toast':
        return errorCode.startsWith('E') ? 'high' : 'medium';
      case 'Revel':
        return errorCode.startsWith('ERR') ? 'high' : 'low';
      default:
        return 'unknown';
    }
  };

  return (
    <div className="pos-alerts">
      <h3>POS Alerts</h3>
      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        <ul>
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className={`alert-${getAlertSeverity(alert.errorCode, alert.posProfileId)}`}
            >
              <strong>{alert.errorCode}</strong>: {alert.message}
              <br />
              <small>
                POS Profile:{' '}
                {posProfiles.find((p) => p.id === alert.posProfileId)?.name}
              </small>
              <br />
              <small>Time: {alert.timestamp.toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default POSAlerts;
