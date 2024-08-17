const { Guest } = require('./models');

async function seedGuests() {
  await Guest.bulkCreate([
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      numberOfOrders: 5,
      averageOrderSize: 24.99,
      favoriteMenuItem: 'Burger',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      numberOfOrders: 10,
      averageOrderSize: 15.45,
      favoriteMenuItem: 'Pizza',
    },
  ]);
  console.log('Guests seeded successfully');
}

seedGuests();
