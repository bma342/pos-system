import React, { useState, useEffect, useMemo } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { POSIntegrationService } from '../services/POSIntegrationService';

interface POSIntegrationSelectorProps {
  onSelect: (integration: string) => void;
}

const POSIntegrationSelector: React.FC<POSIntegrationSelectorProps> = ({
  onSelect,
}) => {
  const [availableIntegrations, setAvailableIntegrations] = useState<string[]>(
    []
  );
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');

  const posIntegrationService = useMemo(() => new POSIntegrationService(), []);

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const integrations =
          await posIntegrationService.getAvailableIntegrations();
        setAvailableIntegrations(integrations);
      } catch (error) {
        console.error('Failed to fetch POS integrations:', error);
      }
    };

    fetchIntegrations();
  }, [posIntegrationService]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedIntegration(event.target.value as string);
  };

  const handleSubmit = () => {
    if (selectedIntegration) {
      onSelect(selectedIntegration);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="pos-integration-select-label">POS Integration</InputLabel>
      <Select
        labelId="pos-integration-select-label"
        id="pos-integration-select"
        value={selectedIntegration}
        label="POS Integration"
        onChange={handleChange}
      >
        {availableIntegrations.map((integration) => (
          <MenuItem key={integration} value={integration}>
            {integration}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={handleSubmit} disabled={!selectedIntegration}>
        Connect POS
      </Button>
    </FormControl>
  );
};

export default POSIntegrationSelector;
