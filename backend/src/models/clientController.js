const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all clients', error });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client details', error });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, email, phoneNumber, address } = req.body;
    const subdomain = name.toLowerCase().replace(/\s+/g, '-'); // Generate subdomain from client name
    const client = await Client.create({ name, email, phoneNumber, address, subdomain });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    await client.update(req.body);
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    await client.destroy();
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};

exports.getClientTheme = async (req, res) => {
  try {
    const subdomain = req.headers['x-subdomain']; // Assuming subdomain is passed in header
    const client = await Client.findOne({ where: { subdomain: subdomain } });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const theme = {
      primaryColor: client.primaryColor,
      secondaryColor: client.secondaryColor,
      accentColor: client.accentColor,
      primaryFont: client.primaryFont,
      secondaryFont: client.secondaryFont,
    };

    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client theme', error });
  }
};
