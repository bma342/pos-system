'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert Client
    const [client] = await queryInterface.bulkInsert('Clients', [{
      name: 'Demo Client',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    // Insert ClientSettings
    await queryInterface.bulkInsert('ClientSettings', [{
      clientId: client.id,
      twoFactorRequired: false,
      defaultPaymentGateways: JSON.stringify(['stripe', 'paypal']),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Insert Users
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'clientAdmin',
        clientId: client.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: hashedPassword,
        role: 'manager',
        clientId: client.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Insert Locations
    await queryInterface.bulkInsert('Locations', [
      {
        name: 'Main Store',
        address: '123 Main St, City, State 12345',
        clientId: client.id,
        twoFactorException: false,
        paymentGatewayExceptions: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Branch Store',
        address: '456 Branch St, City, State 12345',
        clientId: client.id,
        twoFactorException: true,
        paymentGatewayExceptions: JSON.stringify(['stripe']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Add more seed data for other models as needed...
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('ClientSettings', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
    await queryInterface.bulkDelete('Clients', null, {});
    // Remove seed data for other models...
  }
};