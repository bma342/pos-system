'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Client
    const [client] = await queryInterface.bulkInsert('Clients', [{
      name: 'Enterprise Foods Inc.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    // Seed ClientBranding
    await queryInterface.bulkInsert('ClientBrandings', [{
      clientId: client.id,
      logo: 'https://example.com/logo.png',
      favicon: 'https://example.com/favicon.ico',
      primaryColor: '#1976D2',
      secondaryColor: '#424242',
      accentColor: '#82B1FF',
      fontFamily: 'Roboto, sans-serif',
      buttonStyle: 'rounded',
      headerStyle: 'centered',
      footerContent: '© 2023 Enterprise Foods Inc. All rights reserved.',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Seed ClientFeatures
    await queryInterface.bulkInsert('ClientFeatures', [{
      clientId: client.id,
      loyalty: true,
      onlineOrdering: true,
      tableReservations: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Seed Users
    await queryInterface.bulkInsert('Users', [
      {
        clientId: client.id,
        email: 'admin@enterprisefoods.com',
        password: '$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Hashed password
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: client.id,
        email: 'manager@enterprisefoods.com',
        password: '$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Hashed password
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed Locations
    const locations = await queryInterface.bulkInsert('Locations', [
      {
        clientId: client.id,
        name: 'Downtown Branch',
        address: '123 Main St, Metropolis, NY 10001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: client.id,
        name: 'Uptown Branch',
        address: '456 Park Ave, Metropolis, NY 10002',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Seed Menu Items
    const menuItems = await queryInterface.bulkInsert('MenuItems', [
      {
        locationId: locations[0].id,
        name: 'Enterprise Burger',
        description: 'Our signature burger with secret sauce',
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: locations[0].id,
        name: 'Veggie Delight',
        description: 'Plant-based burger for vegetarians',
        price: 8.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: locations[1].id,
        name: 'Gourmet Pizza',
        description: 'Artisanal pizza with premium toppings',
        price: 12.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Seed Modifiers
    await queryInterface.bulkInsert('Modifiers', [
      {
        menuItemId: menuItems[0].id,
        name: 'Extra Cheese',
        price: 1.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        menuItemId: menuItems[0].id,
        name: 'Bacon',
        price: 1.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        menuItemId: menuItems[2].id,
        name: 'Gluten-Free Crust',
        price: 2.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed POS Settings
    await queryInterface.bulkInsert('POSSettings', [
      {
        clientId: client.id,
        modifierSendMethod: 'list',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed A/B Tests
    await queryInterface.bulkInsert('ABTests', [
      {
        clientId: client.id,
        name: 'Burger Name Test',
        description: 'Testing different names for our signature burger',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        variantA: 'Enterprise Burger',
        variantB: 'Signature Deluxe Burger',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ABTests', null, {});
    await queryInterface.bulkDelete('POSSettings', null, {});
    await queryInterface.bulkDelete('Modifiers', null, {});
    await queryInterface.bulkDelete('MenuItems', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('ClientFeatures', null, {}); // Add this line
    await queryInterface.bulkDelete('ClientBrandings', null, {});
    await queryInterface.bulkDelete('Clients', null, {});
  }
};