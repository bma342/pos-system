const { Role } = require('./models');

async function seedRoles() {
  try {
    await Role.bulkCreate([
      { name: 'Super Admin' },
      { name: 'Admin' },
      { name: 'Manager' },
    ]);

    console.log('Roles seeded successfully!');
    process.exit(0); // Exit the script
  } catch (error) {
    console.error('Error seeding roles:', error);
    process.exit(1); // Exit with error
  }
}

seedRoles();
