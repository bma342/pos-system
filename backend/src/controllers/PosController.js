const PosService = require('../services/PosService');

class PosController {
  static async createProfile(req, res) {
    try {
      const profile = await PosService.createProfile(req.body);
      return res.status(201).json(profile);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllProfiles(req, res) {
    try {
      const profiles = await PosService.getAllProfiles();
      return res.status(200).json(profiles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProfileById(req, res) {
    try {
      const profile = await PosService.getProfileById(req.params.id);
      if (profile) {
        return res.status(200).json(profile);
      }
      return res.status(404).json({ message: 'Profile not found' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const profile = await PosService.updateProfile(req.params.id, req.body);
      return res.status(200).json(profile);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteProfile(req, res) {
    try {
      const success = await PosService.deleteProfile(req.params.id);
      if (success) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'Profile not found' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PosController;
