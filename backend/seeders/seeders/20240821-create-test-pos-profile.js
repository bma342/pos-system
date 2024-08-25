module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clientId = (await queryInterface.rawSelect('Clients', { where: { name: 'Bryce Vegas Eats' } }, ['id']));
    const locationId = (await queryInterface.rawSelect('Locations', { where: { name: 'Bryce Vegas Eats - Downtown' } }, ['id']));

    await queryInterface.bulkInsert('PosProfiles', [
      {
        name: 'TEST POS Profile',
        clientId,
        clientSecret: 'TEST_SECRET_KEY',
        apiBaseUrl: 'https://test-pos-api.com',
        locationId,
        posSystem: 'TestPOS',
        isGlobal: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PosProfiles', null, {});
  },
};
