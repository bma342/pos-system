const { Client } = require('../src/models');
const crypto = require('crypto');

async function createClient(name) {
  const subdomain = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const existingClient = await Client.findOne({ where: { subdomain } });

  if (existingClient) {
    console.log(`Client with subdomain '${subdomain}' already exists.`);
    return;
  }

  const clientId = crypto.randomBytes(16).toString('hex'); // Generate a secure client ID

  const client = await Client.create({
    id: clientId,
    name,
    subdomain,
    settings: {
      theme: 'default',
      features: ['online_ordering', 'reservations'],
    },
  });

  console.log(`Created client: ${client.name} with subdomain: ${client.subdomain}`);
}

const clientName = process.argv[2];
if (!clientName) {
  console.error('Please provide a client name');
  process.exit(1);
}

createClient(clientName).catch((error) => {
  console.error('Error creating client:', error);
  process.exit(1);
});
