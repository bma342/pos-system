const GlobalSetting = require('../models/GlobalSetting');

class GlobalSettingsService {
  static async getSetting(key) {
    const setting = await GlobalSetting.findOne({ where: { key } });
    return setting ? setting.value : null;
  }

  static async updateSetting(key, value) {
    const setting = await GlobalSetting.findOne({ where: { key } });
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      await GlobalSetting.create({ key, value });
    }
  }
}

module.exports = GlobalSettingsService;
