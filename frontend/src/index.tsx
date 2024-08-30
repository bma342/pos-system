import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import muiTheme from './theme';
import App from './App';
import { store, persistor } from './redux/store';
import { ClientProvider } from './context/ClientContext';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Set up axios for development environment
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://your-dev-api-url.com'; // Replace with your actual development API URL
  axios.defaults.headers.common['Content-Type'] = 'application/json';
}

// Set up react-query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

try {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              <ClientProvider>
                <Router>
                  <App />
                </Router>
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </ClientProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering React app:', error);
  document.body.innerHTML =
    '<h1>An error occurred while loading the application. Please try again later.</h1>';
}

// Register the service worker for offline capabilities
serviceWorkerRegistration.register();

// Measure performance in your app, pass a function to log results (for example: reportWebVitals(console.log))
reportWebVitals();
