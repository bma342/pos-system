const multer = require('multer');

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  // Accept only image files with specific formats
  if (!file.mimetype.match(/^image\/(jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed (jpeg, png, gif)'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 }, // Limit file size to 500KB
});

exports.uploadLogo = upload.single('logo');
