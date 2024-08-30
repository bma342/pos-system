const { CampaignStep } = require('../models');

exports.getAllCampaignSteps = async (req, res) => {
  try {
    const campaignSteps = await CampaignStep.findAll();
    res.json(campaignSteps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign steps', error: error.message });
  }
};

exports.createCampaignStep = async (req, res) => {
  try {
    const newCampaignStep = await CampaignStep.create(req.body);
    res.status(201).json(newCampaignStep);
  } catch (error) {
    res.status(400).json({ message: 'Error creating campaign step', error: error.message });
  }
};

exports.getCampaignStep = async (req, res) => {
  try {
    const campaignStep = await CampaignStep.findByPk(req.params.id);
    if (campaignStep) {
      res.json(campaignStep);
    } else {
      res.status(404).json({ message: 'Campaign step not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign step', error: error.message });
  }
};

exports.updateCampaignStep = async (req, res) => {
  try {
    const [updated] = await CampaignStep.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCampaignStep = await CampaignStep.findByPk(req.params.id);
      res.json(updatedCampaignStep);
    } else {
      res.status(404).json({ message: 'Campaign step not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating campaign step', error: error.message });
  }
};

exports.deleteCampaignStep = async (req, res) => {
  try {
    const deleted = await CampaignStep.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Campaign step not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campaign step', error: error.message });
  }
};
