'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Fetch the IDs from the Clients table
      const clients = await queryInterface.sequelize.query(
        `SELECT id, subdomain FROM "Clients" WHERE subdomain IN ('clienta', 'clientb');`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      if (clients.length < 2) {
        throw new Error('Not enough clients found. Please ensure clients are seeded first.');
      }

      const clientAId = clients.find(client => client.subdomain === 'clienta').id;
      const clientBId = clients.find(client => client.subdomain === 'clientb').id;

      // Check for existing roles
      const existingRoles = await queryInterface.sequelize.query(
        `SELECT name, "clientId" FROM "Roles" WHERE name IN ('Super Admin', 'Admin', 'Manager')`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      const rolesToCreate = [
        {
          name: 'Super Admin',
          level: 5,
          clientId: clientAId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Admin',
          level: 4,
          clientId: clientBId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Manager',
          level: 3,
          clientId: clientBId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ].filter(role => !existingRoles.some(existingRole => 
        existingRole.name === role.name && existingRole.clientId === role.clientId
      ));

      if (rolesToCreate.length > 0) {
        await queryInterface.bulkInsert('Roles', rolesToCreate, { transaction });
      }

      await transaction.commit();
      console.log('Roles created successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating roles:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('Roles', {
        name: ['Super Admin', 'Admin', 'Manager']
      }, { transaction });

      await transaction.commit();
      console.log('Roles removed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing roles:', error);
      throw error;
    }
  }
};
