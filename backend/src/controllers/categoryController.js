const categoryService = require('../services/categoryService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories(req.user.clientId);
    res.status(200).json(categories);
  } catch (error) {
    logger.error('Error fetching categories:', error);
    next(new AppError('Error fetching categories', 500));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id, req.user.clientId);
    res.status(200).json(category);
  } catch (error) {
    logger.error(`Error fetching category ${req.params.id}:`, error);
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryService.createCategory(req.body, req.user.clientId);
    res.status(201).json(newCategory);
  } catch (error) {
    logger.error('Error creating category:', error);
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body, req.user.clientId);
    res.status(200).json(updatedCategory);
  } catch (error) {
    logger.error(`Error updating category ${req.params.id}:`, error);
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id, req.user.clientId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting category ${req.params.id}:`, error);
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
