'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the clientId based on your client information
    const client = await queryInterface.rawSelect('Clients', {
      where: { name: 'Maizey Demo Client' } // Adjust the client name if needed
    }, ['id']);

    if (!client) {
      console.error('Client not found. Seeding guests aborted.');
      return;
    }

    const guests = [];
    for (let i = 0; i < 150; i++) {
      guests.push({
        clientId: client, // Use the fetched clientId
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        loyaltyPoints: faker.number.int({ min: 0, max: 1000 }),
        engagementScore: faker.number.int({ min: 0, max: 100 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Guests', guests, {});
  },

  down: async (queryInterface, Sequelize) => {
    const client = await queryInterface.rawSelect('Clients', {
      where: { name: 'Maizey Demo Client' } // Adjust the client name if needed
    }, ['id']);

    if (client) {
      await queryInterface.bulkDelete('Guests', { clientId: client }, {});
    }
  }
};
