const multer = require("multer");
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/rooms");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}_hotel_${Date.now()}`);
  },
});

const roomUpload = multer({ storage: filestorage });
module.exports = roomUpload;
