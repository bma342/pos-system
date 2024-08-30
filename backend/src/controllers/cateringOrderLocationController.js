const { CateringOrderLocation } = require('../models');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await CateringOrderLocation.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order locations', error: error.message });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const newLocation = await CateringOrderLocation.create(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering order location', error: error.message });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const location = await CateringOrderLocation.findByPk(req.params.id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Catering order location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order location', error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const [updated] = await CateringOrderLocation.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedLocation = await CateringOrderLocation.findByPk(req.params.id);
      res.json(updatedLocation);
    } else {
      res.status(404).json({ message: 'Catering order location not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering order location', error: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const deleted = await CateringOrderLocation.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering order location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering order location', error: error.message });
  }
};
