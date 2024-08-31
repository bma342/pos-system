import axios from 'axios';

const API_URL = '/api/service-fees'; // Adjust this URL as needed

export const getServiceFees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createServiceFee = async (name: string, percentage: number) => {
  const response = await axios.post(API_URL, { name, percentage });
  return response.data;
};
