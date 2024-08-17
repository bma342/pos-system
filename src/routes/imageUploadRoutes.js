const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Image upload route
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ message: 'Image uploaded successfully', imagePath: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error });
  }
});

module.exports = router;
