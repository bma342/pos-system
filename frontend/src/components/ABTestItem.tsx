import React from 'react';
import { ListItem, TextField, Switch, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ABTest } from '../types/abTestTypes';

interface ABTestItemProps {
  test: ABTest;
  onUpdate: (test: ABTest) => void;
  onDelete: (id: string) => void;
}

const ABTestItem: React.FC<ABTestItemProps> = ({ test, onUpdate, onDelete }) => {
  return (
    <ListItem>
      <TextField
        value={test.name}
        onChange={(e) => onUpdate({ ...test, name: e.target.value })}
        aria-label={`Edit ${test.name}`}
      />
      <TextField
        value={test.description}
        onChange={(e) => onUpdate({ ...test, description: e.target.value })}
        aria-label={`Edit description for ${test.name}`}
      />
      <TextField
        value={test.variantA}
        onChange={(e) => onUpdate({ ...test, variantA: e.target.value })}
        aria-label={`Edit variant A for ${test.name}`}
      />
      <TextField
        value={test.variantB}
        onChange={(e) => onUpdate({ ...test, variantB: e.target.value })}
        aria-label={`Edit variant B for ${test.name}`}
      />
      <Switch
        checked={test.isActive}
        onChange={(e) => onUpdate({ ...test, isActive: e.target.checked })}
        aria-label={`Toggle active state for ${test.name}`}
      />
      <IconButton onClick={() => onDelete(test.id)} aria-label={`Delete ${test.name}`}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default ABTestItem;