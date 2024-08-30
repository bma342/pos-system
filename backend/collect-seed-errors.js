const { Sequelize } = require('sequelize');
const { exec } = require('child_process');
const fs = require('fs').promises;

const config = require('./config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

async function runSeeders() {
  const seeders = await fs.readdir('./seeders');
  const errors = [];

  for (const seeder of seeders) {
    if (seeder.endsWith('.js')) {
      try {
        console.log(`Running seeder: ${seeder}`);
        await new Promise((resolve) => {
          exec(`npx sequelize-cli db:seed --seed ${seeder}`, (error, stdout) => {
            if (error) {
              console.error(`Error in seeder ${seeder}:`, error.message);
              errors.push({ seeder, error: error.message });
            } else {
              console.log(stdout);
            }
            resolve(); // Continue to next seeder even if there's an error
          });
        });
      } catch (error) {
        console.error(`Error running seeder ${seeder}:`, error);
        errors.push({ seeder, error: error.message });
      }
    }
  }

  return errors;
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    const errors = await runSeeders();

    if (errors.length > 0) {
      console.log('Errors encountered during seeding:');
      console.log(JSON.stringify(errors, null, 2));
      await fs.writeFile('seed-errors.json', JSON.stringify(errors, null, 2));
      console.log('Errors have been written to seed-errors.json');
    } else {
      console.log('All seeders completed successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

main();

