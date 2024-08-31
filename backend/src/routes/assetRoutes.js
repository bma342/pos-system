const express = require('express');
const path = require('path');
const multer = require('multer');
const AssetController = require('../controllers/assetController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

router.use(authenticate);

router.get('/', authorize(['admin', 'manager']), AssetController.getAllAssets);
router.get('/:id', authorize(['admin', 'manager']), AssetController.getAsset);
router.post('/upload', authorize(['admin', 'manager']), upload.single('file'), AssetController.uploadAsset);
router.put('/:id', authorize(['admin', 'manager']), AssetController.updateAsset);
router.delete('/:id', authorize(['admin']), AssetController.deleteAsset);

module.exports = router;
