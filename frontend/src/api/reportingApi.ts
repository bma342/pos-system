import axios from 'axios';

export interface ReportData {
  salesData: {
    name: string;
    value: number;
  }[];
  // Add other reporting data structures as needed
}

export const fetchReportingData = async (clientId: string): Promise<ReportData> => {
  const response = await axios.get(`/api/reporting/${clientId}`);
  return response.data;
};