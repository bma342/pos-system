const https = require('https');
const fs = require('fs');
const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || 5000;

logger.info('Attempting to start server...');

const options = {
  key: fs.readFileSync('/app/ssl/server.key'),
  cert: fs.readFileSync('/app/ssl/server.cert')
};

const server = https.createServer(options, app);

server.listen(port, () => {
  logger.info(`Server is running on https://localhost:${port}`);
});

server.on('error', (err) => {
  logger.error('Server error:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Add a simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
