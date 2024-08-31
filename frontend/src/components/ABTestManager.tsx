import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { ABTestService } from '../services/ABTestService';
import { ABTest } from '../types/abTestTypes';

const ABTestManager: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [newTest, setNewTest] = useState<Partial<ABTest>>({
    name: '',
    description: '',
    status: 'draft',
  });

  const abTestService = React.useMemo(() => new ABTestService(), []);

  const fetchTests = useCallback(async () => {
    try {
      const fetchedTests = await abTestService.getABTests();
      setTests(fetchedTests);
    } catch (error) {
      console.error('Failed to fetch A/B tests:', error);
    }
  }, [abTestService]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  const handleCreateTest = async () => {
    try {
      await abTestService.createABTest(newTest as ABTest);
      fetchTests();
      setNewTest({ name: '', description: '', status: 'draft' });
    } catch (error) {
      console.error('Failed to create A/B test:', error);
    }
  };

  const handleUpdateTest = async (updatedTest: ABTest) => {
    try {
      await abTestService.updateABTest(updatedTest);
      fetchTests();
    } catch (error) {
      console.error('Failed to update A/B test:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">A/B Test Manager</Typography>
      <div>
        <TextField
          label="Test Name"
          value={newTest.name}
          onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
        />
        <TextField
          label="Description"
          value={newTest.description}
          onChange={(e) =>
            setNewTest({ ...newTest, description: e.target.value })
          }
        />
        <Select
          value={newTest.status}
          onChange={(e) =>
            setNewTest({
              ...newTest,
              status: e.target.value as ABTest['status'],
            })
          }
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
        <Button onClick={handleCreateTest}>Create Test</Button>
      </div>
      <div>
        {tests.map((test) => (
          <div key={test.id}>
            <Typography>{test.name}</Typography>
            <Typography>{test.description}</Typography>
            <Typography>{test.status}</Typography>
            <Button
              onClick={() => handleUpdateTest({ ...test, status: 'active' })}
            >
              Activate
            </Button>
            <Button
              onClick={() => handleUpdateTest({ ...test, status: 'completed' })}
            >
              Complete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ABTestManager;
