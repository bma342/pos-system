import React from 'react';
import * as Sentry from "@sentry/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      {/* Your app components */}
      <ToastContainer />
    </ErrorBoundary>
  );
};

export default App;