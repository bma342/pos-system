const https = require('https');
const fs = require('fs');
const app = require('./app');
const db = require('./config/database');
const SyncService = require('./services/SyncService');

const PORT = process.env.PORT || 5000;

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync('/app/ssl/server.key'),
  cert: fs.readFileSync('/app/ssl/server.cert')
};

// Add simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start the HTTPS server and synchronize the database
db.sync().then(() => {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
    SyncService.startDataSyncJobs();
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
