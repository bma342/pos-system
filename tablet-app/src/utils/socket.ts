import { io } from 'socket.io-client';

const SOCKET_URL = 'http://your-backend-url.com';

export const socket = io(SOCKET_URL);

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};