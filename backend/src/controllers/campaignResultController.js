const { CampaignResult } = require('../models');

exports.getAllCampaignResults = async (req, res) => {
  try {
    const campaignResults = await CampaignResult.findAll();
    res.json(campaignResults);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign results', error: error.message });
  }
};

exports.createCampaignResult = async (req, res) => {
  try {
    const newCampaignResult = await CampaignResult.create(req.body);
    res.status(201).json(newCampaignResult);
  } catch (error) {
    res.status(400).json({ message: 'Error creating campaign result', error: error.message });
  }
};

exports.getCampaignResult = async (req, res) => {
  try {
    const campaignResult = await CampaignResult.findByPk(req.params.id);
    if (campaignResult) {
      res.json(campaignResult);
    } else {
      res.status(404).json({ message: 'Campaign result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign result', error: error.message });
  }
};

exports.updateCampaignResult = async (req, res) => {
  try {
    const [updated] = await CampaignResult.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCampaignResult = await CampaignResult.findByPk(req.params.id);
      res.json(updatedCampaignResult);
    } else {
      res.status(404).json({ message: 'Campaign result not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating campaign result', error: error.message });
  }
};

exports.deleteCampaignResult = async (req, res) => {
  try {
    const deleted = await CampaignResult.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Campaign result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campaign result', error: error.message });
  }
};
