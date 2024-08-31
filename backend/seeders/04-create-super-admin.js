'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Check if Super Admin role exists
      let superAdminRole = await queryInterface.sequelize.query(
        `SELECT id FROM "Roles" WHERE name = 'Super Admin' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      let superAdminRoleId;

      if (superAdminRole.length === 0) {
        // Create Super Admin role if it doesn't exist
        [superAdminRole] = await queryInterface.bulkInsert('Roles', [{
          name: 'Super Admin',
          level: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }], { returning: true, transaction });
        superAdminRoleId = superAdminRole.id;
      } else {
        superAdminRoleId = superAdminRole[0].id;
      }

      // Check if Super Admin user exists
      const existingSuperAdmin = await queryInterface.sequelize.query(
        `SELECT id FROM "Users" WHERE username = 'superadmin' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      if (existingSuperAdmin.length === 0) {
        // Create Super Admin user if it doesn't exist
        const hashedPassword = await bcrypt.hash('Brycer23@$', 10);

        await queryInterface.bulkInsert('Users', [{
          username: 'superadmin',
          email: 'superadmin@yourdomain.com',
          password: hashedPassword,
          roleId: superAdminRoleId,
          firstName: 'Super',
          lastName: 'Admin',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }], { transaction });

        console.log('Super Admin user created successfully');
      } else {
        console.log('Super Admin user already exists');
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Error in Super Admin creation:', error);
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Remove Super Admin user
      await queryInterface.bulkDelete('Users', { username: 'superadmin' }, { transaction });

      // Remove Super Admin role
      await queryInterface.bulkDelete('Roles', { name: 'Super Admin' }, { transaction });

      await transaction.commit();
      console.log('Super Admin user and role removed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing Super Admin user and role:', error);
      throw error;
    }
  }
};
