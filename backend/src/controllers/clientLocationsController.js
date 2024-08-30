const { Client, Location } = require('../models');

exports.getClientLocations = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findByPk(clientId, {
      include: [{
        model: Location,
        attributes: ['id', 'name', 'address', 'city', 'state', 'zipCode', 'phoneNumber', 'email', 'latitude', 'longitude']
      }]
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client.Locations);
  } catch (error) {
    console.error('Error fetching client locations:', error);
    res.status(500).json({ message: 'Error fetching client locations', error: error.message });
  }
};
