const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orders = [];
    const locationId = (await queryInterface.rawSelect('Locations', { where: { name: 'Bryce Vegas Eats - Downtown' } }, ['id']));
    const guestIds = await queryInterface.sequelize.query(
      `SELECT id FROM Guests WHERE "preferredLocationId" = ${locationId};`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (let i = 0; i < 2500; i++) {
      const guestId = guestIds[Math.floor(Math.random() * guestIds.length)].id;
      orders.push({
        guestId,
        locationId,
        orderDate: faker.date.recent(30),
        totalAmount: faker.commerce.price(10, 200, 2),
        paymentMethod: faker.random.arrayElement(['credit_card', 'cash', 'online']),
        serviceFee: faker.commerce.price(2, 15, 2),
        tipAmount: faker.commerce.price(0, 10, 2),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Orders', orders);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
