const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { Asset } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const { optimizeImage } = require('../services/imageService');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

const ensureUploadDir = async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
};

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await Asset.findAll({ where: { tenantId: req.user.tenantId } });
    res.status(200).json(assets);
  } catch (error) {
    logger.error('Error fetching assets:', error);
    next(new AppError('Error fetching assets', 500));
  }
};

const getAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findOne({ 
      where: { id: req.params.id, tenantId: req.user.tenantId } 
    });
    if (!asset) {
      return next(new AppError('Asset not found', 404));
    }
    res.status(200).json(asset);
  } catch (error) {
    logger.error(`Error fetching asset ${req.params.id}:`, error);
    next(new AppError('Error fetching asset', 500));
  }
};

const uploadAsset = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    await ensureUploadDir();

    const optimizedBuffer = await optimizeImage(req.file.buffer);
    const filename = `${uuidv4()}-${req.file.originalname}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filePath, optimizedBuffer);

    const asset = await Asset.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      url: `/uploads/${filename}`,
      size: optimizedBuffer.length,
      tenantId: req.user.tenantId
    });

    logger.info(`Asset uploaded: ${asset.id}`);
    res.status(201).json(asset);
  } catch (error) {
    logger.error('Error uploading asset:', error);
    next(new AppError('Error uploading asset', 500));
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findOne({ 
      where: { id: req.params.id, tenantId: req.user.tenantId } 
    });
    if (!asset) {
      return next(new AppError('Asset not found', 404));
    }

    const updatedAsset = await asset.update(req.body);
    logger.info(`Asset updated: ${updatedAsset.id}`);
    res.status(200).json(updatedAsset);
  } catch (error) {
    logger.error(`Error updating asset ${req.params.id}:`, error);
    next(new AppError('Error updating asset', 500));
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findOne({ 
      where: { id: req.params.id, tenantId: req.user.tenantId } 
    });
    if (!asset) {
      return next(new AppError('Asset not found', 404));
    }

    const filePath = path.join(UPLOAD_DIR, path.basename(asset.url));
    await fs.unlink(filePath);
    await asset.destroy();

    logger.info(`Asset deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting asset ${req.params.id}:`, error);
    next(new AppError('Error deleting asset', 500));
  }
};

module.exports = {
  getAllAssets,
  getAsset,
  uploadAsset,
  updateAsset,
  deleteAsset
};