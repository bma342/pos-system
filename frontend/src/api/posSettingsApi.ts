import axios from 'axios';

export const fetchPOSSettings = async () => {
  try {
    const response = await axios.get('/api/pos-settings');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch POS settings');
  }
};

export const updatePOSSettings = async (settings: {
  modifierSendMethod: string;
}) => {
  try {
    const response = await axios.put('/api/pos-settings', settings);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update POS settings');
  }
};
