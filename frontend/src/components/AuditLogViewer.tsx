import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAuditLogsAsync } from '../redux/slices/auditLogSlice';

const AuditLogViewer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { logs, totalPages, currentPage, status, error } = useSelector(
    (state: RootState) => state.auditLog
  );

  useEffect(() => {
    dispatch(fetchAuditLogsAsync(currentPage));
  }, [dispatch, currentPage]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Audit Logs</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.userId}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() =>
            dispatch(fetchAuditLogsAsync(Math.max(1, currentPage - 1)))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            dispatch(fetchAuditLogsAsync(Math.min(totalPages, currentPage + 1)))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditLogViewer;
