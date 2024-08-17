const https = require('https');
const fs = require('fs');
const app = require('./app');
const { sequelize } = require('./models');
const cronJobs = require('./cronJobs'); // Import cron jobs to run scheduled tasks
const SyncService = require('./services/SyncService'); // Import SyncService

// Load SSL certificate and key with correct paths
const sslOptions = {
  key: fs.readFileSync('./src/ssl/server.key'),
  cert: fs.readFileSync('./src/ssl/server.cert'),
};

const PORT = process.env.PORT || 5000;

// Start the HTTPS server and synchronize the database
sequelize.sync().then(() => {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
    SyncService.startDataSyncJobs(); // Start any data sync services needed on startup
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
