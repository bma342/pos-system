const DataWall = require('../models/DataWall');

exports.createDataWall = async (req, res) => {
  const { name, accessLevel, locationId, reportId, permissions } = req.body;

  try {
    if (!req.user.locations.includes(locationId)) {
      return res.status(403).json({ message: 'Access denied to this location.' });
    }

    const dataWall = await DataWall.create({
      name,
      accessLevel,
      locationId,
      reportId,
      permissions,
    });

    res.status(201).json(dataWall);
  } catch (error) {
    res.status(500).json({ message: 'Error creating data wall', error });
  }
};

exports.getDataWallsByLocation = async (req, res) => {
  const { locationId } = req.params;

  try {
    if (!req.user.locations.includes(locationId)) {
      return res.status(403).json({ message: 'Access denied to this location.' });
    }

    const dataWalls = await DataWall.findAll({ where: { locationId } });
    res.json(dataWalls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data walls', error });
  }
};
