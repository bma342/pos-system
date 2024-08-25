const db = require('../models');

exports.createPixel = async (req, res) => {
  try {
    const pixel = await db.TrackingPixel.create(req.body);
    res.status(201).json(pixel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tracking pixel', error });
  }
};

exports.updatePixel = async (req, res) => {
  try {
    const pixel = await db.TrackingPixel.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(pixel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tracking pixel', error });
  }
};

exports.deletePixel = async (req, res) => {
  try {
    await db.TrackingPixel.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tracking pixel', error });
  }
};

exports.getPixelsByLocation = async (req, res) => {
  try {
    const pixels = await db.TrackingPixel.findAll({ where: { locationId: req.params.locationId } });
    res.status(200).json(pixels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tracking pixels', error });
  }
};
