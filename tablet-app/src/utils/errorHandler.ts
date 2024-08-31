import { Alert } from 'react-native';

export const handleError = (error: any) => {
  let message = 'An unexpected error occurred';
  
  if (error.response) {
    message = error.response.data.message || message;
  } else if (error.message) {
    message = error.message;
  }

  Alert.alert('Error', message);
};