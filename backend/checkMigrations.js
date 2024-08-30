const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

// Log the database connection setup
console.log('Setting up database connection...');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Assuming your DB is hosted locally
  username: 'bryce',
  password: '1234',
  database: 'pos',
  logging: console.log, // Enable Sequelize logging to see SQL queries
});

console.log('Database connection setup completed.');

// Log the Umzug setup
console.log('Setting up Umzug for migrations...');

const umzug = new Umzug({
  migrations: {
    glob: './migrations/*.js', // Path to your migration files
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

console.log('Umzug setup completed.');

// Function to validate migrations
async function checkMigrations() {
  try {
    console.log('Checking migrations...');

    const migrations = await umzug.pending(); // Get all pending migrations
    if (migrations.length === 0) {
      console.log('All migrations have already been executed.');
    } else {
      console.log(`Found ${migrations.length} pending migrations.`);

      for (const migration of migrations) {
        console.log(`Testing migration: ${migration.name}`);
        try {
          await umzug.up({ migrations: [migration.name] }); // Run the migration
          console.log(`Migration ${migration.name} executed successfully.`);
          
          // Rollback immediately to keep the database clean
          await umzug.down({ migrations: [migration.name] });
          console.log(`Migration ${migration.name} rolled back successfully.`);
        } catch (error) {
          console.error(`Error executing migration ${migration.name}:`, error);
          return; // Stop further checks if any migration fails
        }
      }

      console.log('All migrations tested successfully.');
    }
  } catch (error) {
    console.error('Error while checking migrations:', error);
  } finally {
    await sequelize.close(); // Close the database connection
  }
}

// Run the migration check
checkMigrations();
