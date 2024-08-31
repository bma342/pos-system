const { getRepository, Connection } = require 'typeorm';
const { faker } = require '@faker-js/faker';
const { Client, Location, Guest, MenuItem, LoyaltyReward, Order, Discount, AuditLog, DropOffLocation, DropOffTime } = require '../entities';

export async function seedEnterpriseClient(connection) {
  const client = await seedClient(connection);
  const locations = await seedLocations(connection, client);
  const menuItems = await seedMenuItems(connection, client);
  const guests = await seedGuests(connection, client);
  const loyaltyRewards = await seedLoyaltyRewards(connection, client);
  const discounts = await seedDiscounts(connection, client);
  await seedOrders(connection, client, locations, guests, menuItems, discounts);
  await seedAuditLog(connection, client);

  console.log('Enterprise client data seeded successfully');
}

async function seedClient(connection) {
  const clientRepository = getRepository(Client);
  const client = clientRepository.create({
    name: 'Enterprise Foods Inc.',
    subdomain: 'enterprise-foods',
    active,
  });
  return await clientRepository.save(client);
}

async function seedLocations(connection, client)[]> {
  const locationRepository = getRepository(Location);
  const locations[] = [];

  for (let i = 0; i < 15; i++) {
    const location = locationRepository.create({
      name: `${faker.address.city()} Branch`,
      address.address.streetAddress(),
      city.address.city(),
      state.address.state(),
      zipCode.address.zipCode(),
      phoneNumber.phone.phoneNumber(),
      email.internet.email(),
      latitude(faker.address.latitude()),
      longitude(faker.address.longitude()),
      client,
      isDropoffSite.datatype.boolean(),
    });
    locations.push(await locationRepository.save(location));

    if (location.isDropoffSite) {
      await seedDropOffLocations(connection, location);
    }
  }

  return locations;
}

async function seedDropOffLocations(connection, parentLocation) {
  const dropOffLocationRepository = getRepository(DropOffLocation);
  const dropOffTimeRepository = getRepository(DropOffTime);

  for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
    const dropOffLocation = dropOffLocationRepository.create({
      name: `${faker.company.companyName()} Drop-off`,
      address.address.streetAddress(),
      city.address.city(),
      state.address.state(),
      zipCode.address.zipCode(),
      parentLocation,
    });
    const savedDropOffLocation = await dropOffLocationRepository.save(dropOffLocation);

    for (let j = 0; j < faker.datatype.number({ min: 1, max: 5 }); j++) {
      const dropOffTime = dropOffTimeRepository.create({
        time.date.future().toTimeString().slice(0, 5),
        dropOffLocation,
      });
      await dropOffTimeRepository.save(dropOffTime);
    }
  }
}

async function seedMenuItems(connection, client)[]> {
  const menuItemRepository = getRepository(MenuItem);
  const menuItems[] = [];

  const categories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];

  for (let i = 0; i < 50; i++) {
    const menuItem = menuItemRepository.create({
      name.commerce.productName(),
      description.lorem.sentence(),
      price(faker.commerce.price()),
      category.random.arrayElement(categories),
      client,
    });
    menuItems.push(await menuItemRepository.save(menuItem));
  }

  return menuItems;
}

// ... (implement other seeding functions, seedLoyaltyRewards, seedDiscounts, seedOrders, seedAuditLog)
