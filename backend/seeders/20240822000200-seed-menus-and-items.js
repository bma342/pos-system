'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Sample Menus
    const menus = await queryInterface.bulkInsert(
      'Menus',
      [
        {
          name: 'Main Menu',
          description: 'Our flagship menu for all dining options',
          clientId: 1, // Assuming this is the correct clientId
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const menuId = menus[0].id;

    // Insert Menu Groups
    const groups = await queryInterface.bulkInsert(
      'MenuGroups',
      [
        {
          name: 'Appetizers',
          description: 'Start your meal with our delicious appetizers',
          menuId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Entrees',
          description: 'Main course meals to satisfy any craving',
          menuId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Desserts',
          description: 'Sweet treats to end your meal on a high note',
          menuId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const [appetizersGroupId, entreesGroupId, dessertsGroupId] = groups.map(
      (g) => g.id
    );

    // Insert Menu Items and Modifiers with Images
    await queryInterface.bulkInsert('MenuItems', [
      {
        name: 'Mozzarella Sticks',
        description: 'Crispy and cheesy mozzarella sticks served with marinara',
        price: 7.99,
        menuGroupId: appetizersGroupId,
        image: '/images/menu-items/mozzarella-sticks.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grilled Chicken Alfredo',
        description: 'Grilled chicken over fettuccine pasta with creamy Alfredo sauce',
        price: 14.99,
        menuGroupId: entreesGroupId,
        image: '/images/menu-items/chicken-alfredo.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Decadent chocolate cake with a molten center',
        price: 6.49,
        menuGroupId: dessertsGroupId,
        image: '/images/menu-items/chocolate-lava-cake.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MenuItems', null, {});
    await queryInterface.bulkDelete('MenuGroups', null, {});
    await queryInterface.bulkDelete('Menus', null, {});
  },
};
