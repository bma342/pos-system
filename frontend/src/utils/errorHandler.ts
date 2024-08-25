import axios, { AxiosError } from 'axios';

export const logError = (
  message: string,
  error: Error,
  errorInfo?: unknown
): void => {
  // Implement your logging mechanism here
  console.error(message, error, errorInfo);

  // Optional: Integrate with an external logging service
};

export const handleApiError = (error: AxiosError | Error): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Message:', error.message);
    }
  } else {
    // Handle non-Axios errors
    console.error('Non-Axios Error:', error.message);
  }
};
