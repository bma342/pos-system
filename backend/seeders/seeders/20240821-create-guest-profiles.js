const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const guests = [];
    const clientId = (await queryInterface.rawSelect('Clients', { where: { name: 'Bryce Vegas Eats' } }, ['id']));

    for (let i = 0; i < 150; i++) {
      guests.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        loyaltyPoints: faker.datatype.number({ min: 0, max: 500 }),
        preferredLocationId: (await queryInterface.rawSelect('Locations', { where: { clientId } }, ['id'])),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Guests', guests);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Guests', null, {});
  },
};
