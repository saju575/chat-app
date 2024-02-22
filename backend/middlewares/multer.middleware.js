const multer = require("multer");

const jimp = require("jimp");

const storage = multer.memoryStorage();
exports.upload = multer({
  storage: storage,
  //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("File type not supported. Please upload an image."));
    }
  },
});

exports.resizeImage = async (imageBuffer) => {
  const image = await jimp.read(imageBuffer);
  await image.resize(500, 500).quality(90);
  const processedImageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
  return processedImageBuffer;
};
