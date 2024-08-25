'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Clients
    const [client] = await queryInterface.sequelize.query(
      `SELECT * FROM "Clients" WHERE email = 'contact@maizey-demo.com';`
    );

    if (!client.length) {
      const clients = await queryInterface.bulkInsert(
        'Clients',
        [
          {
            name: 'Maizey Demo Client',
            email: 'contact@maizey-demo.com',
            phoneNumber: '555-555-1234',
            address: '123 Demo Street, Las Vegas, NV 89101',
            subdomain: 'maizey-demo',
            primaryColor: '#ff9800',
            secondaryColor: '#ff5722',
            accentColor: '#00bcd4',
            primaryFont: 'Roboto, sans-serif',
            secondaryFont: 'Open Sans, sans-serif',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: true }
      );

      const clientId = clients[0].id;

      // Seed Locations
      const locations = await queryInterface.bulkInsert(
        'Locations',
        [
          {
            name: 'Maizey Demo Location 1',
            address: '123 Demo Street, Las Vegas, NV 89109',
            city: 'Las Vegas',
            state: 'NV',
            zipCode: '89109',
            country: 'USA',
            clientId,
            posLocationName: 'Maizey Demo Location 1',
            overrideName: 'VIP Location 1',
            waitTime: '10-15 mins',
            isOpen: true,
            diningOptions: '{Pick Up,Delivery}', // Updated format for Sequelize/PostgreSQL array
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: true }
      );

      const locationId = locations[0].id;

      // Seed POS Profiles
      await queryInterface.bulkInsert('PosProfiles', [
        {
          locationId,
          provider: 'FakeToast',
          apiBaseUrl: 'https://api.fake-toast.com',
          clientSecret: 'fake-toast-secret',
          contentType: 'application/json',
          roundingOption: 'nearest',
          testProfile: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      // Seed Users (Super Admin)
      await queryInterface.bulkInsert('Users', [
        {
          username: 'superadmin',
          email: 'bryce.aspinwall@gmail.com',
          password: await bcrypt.hash('Brycer23@$', 10),
          roleId: 1, // Assuming 1 is the Global Admin role
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log('Client data already exists, skipping insertion.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PosProfiles', { provider: 'FakeToast' }, {});
    await queryInterface.bulkDelete('Locations', null, {});
    await queryInterface.bulkDelete('Clients', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
