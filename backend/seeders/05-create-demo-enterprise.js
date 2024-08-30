'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Check if Demo Enterprise client already exists
      let [enterpriseClient] = await queryInterface.sequelize.query(
        `SELECT id FROM "Clients" WHERE subdomain = 'demo-enterprise' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      let clientId;

      if (!enterpriseClient) {
        // Create demo enterprise client if it doesn't exist
        [enterpriseClient] = await queryInterface.bulkInsert('Clients', [{
          name: 'Demo Enterprise',
          subdomain: 'demo-enterprise',
          email: 'admin@demo-enterprise.com',
          features: JSON.stringify({ feature1: true, feature2: true, feature3: true }),
          active: true,
          settings: JSON.stringify({
            timezone: 'America/Los_Angeles',
            currency: 'USD',
          }),
          brandingOptions: JSON.stringify({
            primaryColor: '#4a90e2',
            secondaryColor: '#50e3c2',
            logo: 'demo_enterprise_logo.png',
          }),
          clientSettings: JSON.stringify({
            allowNotifications: true,
            defaultLanguage: 'en',
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }], { returning: true, transaction });

        clientId = enterpriseClient.id;
      } else {
        clientId = enterpriseClient.id;
      }

      // Create roles if they don't exist
      const roles = ['Enterprise Admin', 'Location Manager', 'Staff'];
      for (const role of roles) {
        await queryInterface.bulkInsert('Roles', [{
          name: role,
          clientId,
          createdAt: new Date(),
          updatedAt: new Date()
        }], { ignoreDuplicates: true, transaction });
      }

      // Create 10 locations in Las Vegas if they don't exist
      const lasVegasZipCodes = ['89101', '89102', '89103', '89104', '89105', '89106', '89107', '89108', '89109', '89110'];
      for (let i = 0; i < 10; i++) {
        await queryInterface.bulkInsert('Locations', [{
          clientId,
          name: `Las Vegas Location ${i + 1}`,
          address: faker.address.streetAddress(),
          city: 'Las Vegas',
          state: 'NV',
          zipCode: lasVegasZipCodes[i],
          phone: faker.phone.phoneNumber(),
          email: `lasvegas${i + 1}@demo-enterprise.com`,
          createdAt: new Date(),
          updatedAt: new Date()
        }], { ignoreDuplicates: true, transaction });
      }

      // Create PosIntegrationSettings for FAKE Toast POS if it doesn't exist
      let [posIntegrationSettings] = await queryInterface.sequelize.query(
        `SELECT id FROM "PosIntegrationSettings" WHERE name = 'FAKE Toast POS Settings' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      if (!posIntegrationSettings) {
        [posIntegrationSettings] = await queryInterface.bulkInsert('PosIntegrationSettings', [{
          name: 'FAKE Toast POS Settings',
          type: 'TOAST',
          settings: JSON.stringify({
            apiKey: faker.datatype.uuid(),
            apiSecret: faker.datatype.uuid(),
            restaurantGuid: faker.datatype.uuid(),
            baseUrl: 'https://api.toasttab.com/v1'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }], { returning: true, transaction });
      }

      // Create Fake Toast POS profile as a CorePOSProfile if it doesn't exist
      await queryInterface.bulkInsert('CorePOSProfiles', [{
        profileName: 'FAKE Toast POS',
        integrationSettingsId: posIntegrationSettings.id,
        defaultAPISettings: JSON.stringify({
          baseUrl: 'https://api.toasttab.com/v1',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${apiKey}'
          }
        }),
        translationMapping: JSON.stringify({
          orderId: 'externalOrderId',
          items: 'orderItems',
          total: 'totalAmount',
        }),
        hardcodedSettings: JSON.stringify({
          posProvider: 'Toast',
          version: '1.0'
        }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], { ignoreDuplicates: true, transaction });

      // Create loyalty program if it doesn't exist
      await queryInterface.bulkInsert('LoyaltyPrograms', [{
        clientId,
        name: 'Demo Loyalty Program',
        pointsPerDollar: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }], { ignoreDuplicates: true, transaction });

      // Create sample guests and their profiles
      for (let i = 0; i < 100; i++) {
        const guestId = faker.datatype.uuid();
        await queryInterface.bulkInsert('Guests', [{
          id: guestId,
          clientId,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          createdAt: new Date(),
          updatedAt: new Date()
        }], { ignoreDuplicates: true, transaction });

        await queryInterface.bulkInsert('GuestProfiles', [{
          guestId,
          loyaltyPoints: faker.datatype.number({ min: 0, max: 1000 }),
          totalSpent: faker.datatype.float({ min: 0, max: 1000, precision: 0.01 }),
          lastVisit: faker.date.past(),
          createdAt: new Date(),
          updatedAt: new Date()
        }], { ignoreDuplicates: true, transaction });
      }

      // Create sample orders
      const locations = await queryInterface.sequelize.query(
        `SELECT id FROM "Locations" WHERE "clientId" = :clientId`,
        { 
          replacements: { clientId },
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction
        }
      );

      const guests = await queryInterface.sequelize.query(
        `SELECT id FROM "Guests" WHERE "clientId" = :clientId LIMIT 100`,
        { 
          replacements: { clientId },
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction
        }
      );

      for (let i = 0; i < 500; i++) {
        const orderId = faker.datatype.uuid();
        const locationId = locations[faker.datatype.number({ min: 0, max: locations.length - 1 })].id;
        const guestId = guests[faker.datatype.number({ min: 0, max: guests.length - 1 })].id;
        const orderTotal = faker.datatype.float({ min: 10, max: 200, precision: 0.01 });

        await queryInterface.bulkInsert('Orders', [{
          id: orderId,
          clientId,
          locationId,
          guestId,
          orderNumber: faker.random.alphaNumeric(8).toUpperCase(),
          status: faker.random.arrayElement(['pending', 'completed', 'cancelled']),
          total: orderTotal,
          createdAt: faker.date.past(),
          updatedAt: new Date()
        }], { ignoreDuplicates: true, transaction });

        // Create 1-5 order items for each order
        const itemCount = faker.datatype.number({ min: 1, max: 5 });
        for (let j = 0; j < itemCount; j++) {
          await queryInterface.bulkInsert('OrderItems', [{
            orderId,
            name: faker.commerce.productName(),
            price: faker.datatype.float({ min: 5, max: 50, precision: 0.01 }),
            quantity: faker.datatype.number({ min: 1, max: 5 }),
            createdAt: new Date(),
            updatedAt: new Date()
          }], { ignoreDuplicates: true, transaction });
        }

        // Simulate POS integration by creating an audit log entry
        const posData = {
          orderId,
          total: orderTotal,
          guestId,
          locationId
        };

        await queryInterface.bulkInsert('AuditLogs', [{
          action: 'POS_ORDER_SENT',
          details: JSON.stringify(posData),
          userId: null, // Since this is a system action
          clientId,
          createdAt: new Date(),
          updatedAt: new Date()
        }], { ignoreDuplicates: true, transaction });
      }

      await transaction.commit();
      console.log('Demo Enterprise data created successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating Demo Enterprise data:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const [enterpriseClient] = await queryInterface.sequelize.query(
        `SELECT id FROM "Clients" WHERE subdomain = 'demo-enterprise' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      if (enterpriseClient) {
        const clientId = enterpriseClient.id;

        // Remove all data related to Demo Enterprise
        await queryInterface.bulkDelete('AuditLogs', { clientId }, { transaction });
        await queryInterface.bulkDelete('OrderItems', { orderId: Sequelize.literal(`(SELECT id FROM "Orders" WHERE "clientId" = ${clientId})`) }, { transaction });
        await queryInterface.bulkDelete('Orders', { clientId }, { transaction });
        await queryInterface.bulkDelete('GuestProfiles', { guestId: Sequelize.literal(`(SELECT id FROM "Guests" WHERE "clientId" = ${clientId})`) }, { transaction });
        await queryInterface.bulkDelete('Guests', { clientId }, { transaction });
        await queryInterface.bulkDelete('LoyaltyPrograms', { clientId }, { transaction });
        await queryInterface.bulkDelete('Locations', { clientId }, { transaction });
        await queryInterface.bulkDelete('Roles', { clientId }, { transaction });
        await queryInterface.bulkDelete('Clients', { id: clientId }, { transaction });
      }

      // Remove POS related data
      await queryInterface.bulkDelete('CorePOSProfiles', { profileName: 'FAKE Toast POS' }, { transaction });
      await queryInterface.bulkDelete('PosIntegrationSettings', { name: 'FAKE Toast POS Settings' }, { transaction });

      await transaction.commit();
      console.log('Demo Enterprise data removed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing Demo Enterprise data:', error);
      throw error;
    }
  }
};
