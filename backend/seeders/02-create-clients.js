'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Check for existing clients
      const existingClients = await queryInterface.sequelize.query(
        `SELECT subdomain FROM "Clients" WHERE subdomain IN ('clienta', 'clientb')`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      const existingSubdomains = existingClients.map(client => client.subdomain);

      const clientsToCreate = [
        {
          name: 'Client A',
          subdomain: 'clienta',
          email: 'admin@clienta.com',
          features: JSON.stringify({ feature1: true, feature2: false }),
          active: true,
          settings: JSON.stringify({
            timezone: 'America/New_York',
            currency: 'USD',
          }),
          brandingOptions: JSON.stringify({
            primaryColor: '#ff5733',
            secondaryColor: '#3333ff',
            logo: 'clienta_logo.png',
          }),
          clientSettings: JSON.stringify({
            allowNotifications: true,
            defaultLanguage: 'en',
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Client B',
          subdomain: 'clientb',
          email: 'admin@clientb.com',
          features: JSON.stringify({ feature1: true, feature2: true }),
          active: true,
          settings: JSON.stringify({
            timezone: 'America/Los_Angeles',
            currency: 'USD',
          }),
          brandingOptions: JSON.stringify({
            primaryColor: '#33ff57',
            secondaryColor: '#ff3333',
            logo: 'clientb_logo.png',
          }),
          clientSettings: JSON.stringify({
            allowNotifications: true,
            defaultLanguage: 'es',
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ].filter(client => !existingSubdomains.includes(client.subdomain));

      if (clientsToCreate.length > 0) {
        await queryInterface.bulkInsert('Clients', clientsToCreate, { transaction });
      }

      await transaction.commit();
      console.log('Clients created successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating clients:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('Clients', {
        subdomain: ['clienta', 'clientb']
      }, { transaction });

      await transaction.commit();
      console.log('Clients removed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing clients:', error);
      throw error;
    }
  }
};
