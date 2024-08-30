const { ItemReview } = require('../models');
const logger = require('../services/logger');

exports.getAllItemReviews = async (req, res) => {
  try {
    const reviews = await ItemReview.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    logger.error(`Error fetching item reviews: ${error.message}`);
    res.status(500).json({ message: 'Error fetching item reviews', error });
  }
};

exports.getItemReviewById = async (req, res) => {
  try {
    const review = await ItemReview.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Item review not found' });
    res.status(200).json(review);
  } catch (error) {
    logger.error(`Error fetching item review by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching item review', error });
  }
};

exports.createItemReview = async (req, res) => {
  try {
    const newReview = await ItemReview.create(req.body);
    logger.info(`Item review created: ${newReview.id}`);
    res.status(201).json(newReview);
  } catch (error) {
    logger.error(`Error creating item review: ${error.message}`);
    res.status(500).json({ message: 'Error creating item review', error });
  }
};

exports.updateItemReview = async (req, res) => {
  try {
    const [updated] = await ItemReview.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Item review not found' });

    const updatedReview = await ItemReview.findByPk(req.params.id);
    logger.info(`Item review updated: ${req.params.id}`);
    res.status(200).json(updatedReview);
  } catch (error) {
    logger.error(`Error updating item review: ${error.message}`);
    res.status(500).json({ message: 'Error updating item review', error });
  }
};

exports.deleteItemReview = async (req, res) => {
  try {
    const deleted = await ItemReview.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Item review not found' });

    logger.info(`Item review deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting item review: ${error.message}`);
    res.status(500).json({ message: 'Error deleting item review', error });
  }
};
