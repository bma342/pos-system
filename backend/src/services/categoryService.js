const { Category } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllCategories = async (clientId) => {
  try {
    return await Category.findAll({ where: { clientId } });
  } catch (error) {
    logger.error('Error fetching all categories:', error);
    throw new AppError('Failed to fetch categories', 500);
  }
};

const getCategoryById = async (id, clientId) => {
  try {
    const category = await Category.findOne({ where: { id, clientId } });
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  } catch (error) {
    logger.error(`Error fetching category with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch category', 500);
  }
};

const createCategory = async (categoryData, clientId) => {
  try {
    const newCategory = await Category.create({ ...categoryData, clientId });
    logger.info(`New category created with ID: ${newCategory.id}`);
    return newCategory;
  } catch (error) {
    logger.error('Error creating category:', error);
    throw new AppError('Failed to create category', 500);
  }
};

const updateCategory = async (id, categoryData, clientId) => {
  try {
    const category = await getCategoryById(id, clientId);
    const updatedCategory = await category.update(categoryData);
    logger.info(`Category updated with ID: ${id}`);
    return updatedCategory;
  } catch (error) {
    logger.error(`Error updating category with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update category', 500);
  }
};

const deleteCategory = async (id, clientId) => {
  try {
    const category = await getCategoryById(id, clientId);
    await category.destroy();
    logger.info(`Category deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting category with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete category', 500);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};