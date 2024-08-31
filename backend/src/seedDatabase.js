const { createConnection } = require 'typeorm';
const { seedEnterpriseClient } = require './seeders/enterpriseClientSeeder';

async function runSeed() {
  const connection = await createConnection();
  try {
    await seedEnterpriseClient(connection);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.close();
  }
}

runSeed();
