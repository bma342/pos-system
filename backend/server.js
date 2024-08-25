const https = require('https');
const fs = require('fs');
const app = require('./src/app'); // Ensure correct path
const db = require('./src/config/database');

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync('./src/ssl/server.key'),
  cert: fs.readFileSync('./src/ssl/server.cert'),
};

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
