const corePosProfileService = require('../services/corePosProfileService');

class CorePosProfileController {
  async getAll(req, res) {
    try {
      const profiles = await corePosProfileService.getAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profiles', error });
    }
  }

  async getById(req, res) {
    try {
      const profile = await corePosProfileService.getById(req.params.id);
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  }

  async create(req, res) {
    try {
      const profile = await corePosProfileService.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ message: 'Error creating profile', error });
    }
  }

  async update(req, res) {
    try {
      const profile = await corePosProfileService.update(req.params.id, req.body);
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error updating profile', error });
    }
  }

  async delete(req, res) {
    try {
      await corePosProfileService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: 'Error deleting profile', error });
    }
  }

  async syncLocation(req, res) {
    try {
      await corePosProfileService.syncLocation(req.params.id);
      res.status(200).json({ message: 'Sync initiated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error initiating sync', error });
    }
  }
}

module.exports = new CorePosProfileController();
