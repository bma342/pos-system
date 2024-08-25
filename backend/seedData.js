const { faker } = require('@faker-js/faker');
const db = require('./src/models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    // Create the Super Admin account
    const superAdmin = await db.User.create({
      username: 'superadmin',
      email: 'admin@maizeyproject.com',
      phone: faker.phone.number(),
      password: await bcrypt.hash('supersecurepassword', 10),
      roleId: 1, // Assuming roleId 1 corresponds to Super Admin
      verified: true,
    });

    // Create 5 example locations in Las Vegas
    const locations = [];
    for (let i = 0; i < 5; i++) {
      locations.push(
        await db.Location.create({
          name: `Maizey Location ${i + 1}`,
          address: `${faker.address.streetAddress()}, Las Vegas, NV`,
          city: 'Las Vegas',
          state: 'NV',
          zipCode: faker.address.zipCode(),
          country: 'USA',
          clientId: 1, // Assuming clientId 1 corresponds to your main client
          posLocationName: `POS Location ${i + 1}`,
          overrideName: `VIP Location ${i + 1}`,
          waitTime: '10-15 mins',
          isOpen: true,
          diningOptions: ['Pick Up', 'Delivery'],
        })
      );
    }

    // Create 10,000 randomly generated guests
    const guests = [];
    for (let i = 0; i < 10000; i++) {
      guests.push(
        await db.Guest.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          loyaltyPoints: faker.datatype.number({ min: 0, max: 1000 }),
          favoriteMenuItem: faker.commerce.productName(),
        })
      );
    }

    // Generate random order history and total sales
    const orders = [];
    for (let i = 0; i < 50000; i++) {
      const guestId = faker.helpers.arrayElement(guests).id;
      const locationId = faker.helpers.arrayElement(locations).id;
      orders.push(
        await db.Order.create({
          guestId,
          locationId,
          totalAmount: faker.finance.amount(10, 200, 2),
          paymentMethod: faker.finance.transactionType(),
          orderDate: faker.date.past(2),
          status: faker.helpers.arrayElement(['completed', 'pending', 'canceled']),
          salesChannel: faker.helpers.arrayElement(['in-store', 'online', 'delivery']),
        })
      );
    }

    console.log('Seed data created successfully for Project Maizey!');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

seed();
