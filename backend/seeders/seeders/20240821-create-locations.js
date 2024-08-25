module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clientId = (await queryInterface.rawSelect('Clients', { where: { name: 'Bryce Vegas Eats' } }, ['id']));

    await queryInterface.bulkInsert('Locations', [
      {
        name: 'Bryce Vegas Eats - Downtown',
        address: '123 Main St, Las Vegas, NV 89109',
        city: 'Las Vegas',
        state: 'NV',
        zipCode: '89109',
        country: 'USA',
        clientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bryce Vegas Eats - The Strip',
        address: '456 Strip Blvd, Las Vegas, NV 89109',
        city: 'Las Vegas',
        state: 'NV',
        zipCode: '89109',
        country: 'USA',
        clientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add 3 more locations similarly
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {});
  },
};
