import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, addRole } from '../features/rolesSlice';

const RoleManagement = () => {
  const dispatch = useDispatch();
  const { roles, status, error } = useSelector((state) => state.roles);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [newPermission, setNewPermission] = useState('');

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleAddRole = (e) => {
    e.preventDefault();
    dispatch(addRole(newRole));
    setNewRole({ name: '', permissions: [] });
  };

  const handleAddPermission = () => {
    setNewRole((prevRole) => ({
      ...prevRole,
      permissions: [...prevRole.permissions, newPermission],
    }));
    setNewPermission('');
  };

  return (
    <div>
      <h2>Role Management</h2>
      {status === 'loading' && <p>Loading roles...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {roles.map((role) => (
            <li key={role._id}>
              <strong>{role.name}</strong>: {role.permissions.join(', ')}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddRole}>
        <h3>Create New Role</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Permission"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
        />
        <button type="button" onClick={handleAddPermission}>
          Add Permission
        </button>
        <button type="submit">Create Role</button>
      </form>
    </div>
  );
};

export default RoleManagement;
