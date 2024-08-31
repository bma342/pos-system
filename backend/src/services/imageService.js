const sharp = require('sharp');

const optimizeImage = async (buffer) => {
  return sharp(buffer)
    .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
};

module.exports = {
  optimizeImage
};