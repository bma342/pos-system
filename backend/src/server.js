const https = require('https');
const fs = require('fs');
const app = require('./app');
const { sequelize } = require('./models');

// Load SSL certificate and key with correct paths
const sslOptions = {
  key: fs.readFileSync('./src/ssl/server.key'),
  cert: fs.readFileSync('./src/ssl/server.cert'),
};

const PORT = process.env.PORT || 5000;

// Start the HTTPS server
sequelize.sync().then(() => {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
  });
});
