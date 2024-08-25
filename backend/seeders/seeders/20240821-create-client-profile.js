module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [
      {
        name: 'Bryce Vegas Eats',
        branding: JSON.stringify({
          primaryColor: '#ff6347',
          secondaryColor: '#008080',
          fontColor: '#ffffff',
          logo: 'https://example.com/logo.png',
        }),
        features: JSON.stringify({
          loyalty: true,
          onlineOrdering: true,
          orderAggregation: true,
          reporting: true,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  },
};
