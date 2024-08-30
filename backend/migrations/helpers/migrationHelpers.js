const { QueryTypes } = require('sequelize');

/**
 * Check if a table exists.
 * @param {object} queryInterface - The Sequelize queryInterface object.
 * @param {string} tableName - The name of the table.
 * @returns {Promise<boolean>} - True if the table exists, false otherwise.
 */
async function tableExists(queryInterface, tableName) {
  try {
    const tables = await queryInterface.sequelize.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`,
      { type: QueryTypes.SELECT }
    );
    return tables.some(table => table.table_name === tableName);
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
}

/**
 * Check if a column exists in a table.
 * @param {object} queryInterface - The Sequelize queryInterface object.
 * @param {string} tableName - The name of the table.
 * @param {string} columnName - The name of the column.
 * @returns {Promise<boolean>} - True if the column exists, false otherwise.
 */
async function columnExists(queryInterface, tableName, columnName) {
  try {
    const tableDescription = await queryInterface.describeTable(tableName);
    return !!tableDescription[columnName];
  } catch (error) {
    console.error(`Error checking if column ${columnName} exists in table ${tableName}:`, error);
    return false;
  }
}

/**
 * Check if an index exists in a table.
 * @param {object} queryInterface - The Sequelize queryInterface object.
 * @param {string} tableName - The name of the table.
 * @param {string} indexName - The name of the index.
 * @returns {Promise<boolean>} - True if the index exists, false otherwise.
 */
async function indexExists(queryInterface, tableName, indexName) {
  try {
    const indexes = await queryInterface.showIndex(tableName);
    return indexes.some(index => index.name === indexName);
  } catch (error) {
    console.error(`Error checking if index ${indexName} exists in table ${tableName}:`, error);
    return false;
  }
}

module.exports = {
  tableExists,
  columnExists,
  indexExists
};
