const express = require('express');
const multer = require('multer');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Asset = require('../models/Asset');

// Set up file storage and handling using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload an asset
router.post('/upload', authenticateToken, authorizeRoles(1, 2), upload.single('file'), async (req, res) => {
  try {
    const { clientId, locationId, type } = req.body;
    const filePath = req.file.path;

    const asset = await Asset.create({ clientId, locationId, type, filePath });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

module.exports = router;
