const bcrypt = require('bcrypt');
const db = require('./src/models');

const seedData = async () => {
  try {
    // 1. Create a Super Admin User
    const adminPassword = await bcrypt.hash('Password123', 10);
    const superAdmin = await db.User.create({
      username: 'Bryce',
      email: 'bryce@vegas-pos.com',
      phone: '7021234567',
      password: adminPassword,
      roleId: 1, // Assuming roleId 1 is for Super Admin
      verified: true,
    });

    // 2. Create Client Profiles and Locations
    const vegasVibes = await db.ClientProfile.create({
      name: 'Vegas Vibes Restaurant Group',
      branding: {
        primaryColor: '#1a1a2e',
        secondaryColor: '#ff007f',
        accentColor: '#00f0ff',
        font: 'Montserrat',
        logoUrl: 'https://example.com/neon-logo.png',
      },
    });

    const locations = await db.Location.bulkCreate([
      {
        name: 'Las Vegas Strip',
        address: '1234 Vegas Blvd, Las Vegas, NV 89109',
        clientId: vegasVibes.id,
      },
      {
        name: 'Downtown Vegas',
        address: '567 Fremont St, Las Vegas, NV 89101',
        clientId: vegasVibes.id,
      },
      {
        name: 'Summerlin',
        address: '890 Red Rock Canyon Rd, Las Vegas, NV 89135',
        clientId: vegasVibes.id,
      },
    ]);

    // 3. Create Sample Menu and Items
    const sampleMenu = await db.Menu.create({
      name: 'Vegas Vibes Menu',
      description: 'Experience the best neon-lit dishes in Vegas!',
      clientId: vegasVibes.id,
    });

    const menuGroups = await db.MenuGroup.bulkCreate([
      {
        name: 'Appetizers',
        description: 'Start your night with a bang!',
        menuId: sampleMenu.id,
        posGroupId: 'veg-app-001',
        imageUrl: 'https://example.com/appetizers.png',
      },
      {
        name: 'Main Course',
        description: 'Indulge in our main attractions!',
        menuId: sampleMenu.id,
        posGroupId: 'veg-main-001',
        imageUrl: 'https://example.com/main-course.png',
      },
      {
        name: 'Drinks',
        description: 'Sip on the night with our signature cocktails!',
        menuId: sampleMenu.id,
        posGroupId: 'veg-drinks-001',
        imageUrl: 'https://example.com/drinks.png',
      },
    ]);

    await db.MenuItem.bulkCreate([
      {
        name: 'Neon Nachos',
        description: 'Bright and cheesy with a Vegas twist.',
        basePrice: 12.99,
        pointsPrice: 129,
        posItemId: 'veg-nachos-001',
        imageUrl: 'https://example.com/neon-nachos.png',
        menuGroupId: menuGroups[0].id,
      },
      {
        name: 'Vegas Strip Steak',
        description: 'Juicy, tender, and cooked to perfection.',
        basePrice: 29.99,
        pointsPrice: 299,
        posItemId: 'veg-steak-001',
        imageUrl: 'https://example.com/strip-steak.png',
        menuGroupId: menuGroups[1].id,
      },
      {
        name: 'Signature Glow Cocktail',
        description: 'Glows in the dark with a sweet, tangy taste.',
        basePrice: 15.99,
        pointsPrice: 159,
        posItemId: 'veg-cocktail-001',
        imageUrl: 'https://example.com/glow-cocktail.png',
        menuGroupId: menuGroups[2].id,
      },
    ]);

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
