import io from 'socket.io-client';
import { POSAlert } from '../types';

export const initializeSocket = () => {
  const socket = io('http://localhost:3001'); // Replace with your server URL

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  socket.on('posAlert', (alert: POSAlert) => {
    console.log('Received POS Alert:', alert);
    // In a real application, you would dispatch an action to update the Redux store
  });

  return socket;
};
