const multer = require("multer");
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/hotels");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}_hotel_${Date.now()}`);
  },
});

const hotelUpload = multer({ storage: filestorage });
module.exports = hotelUpload;
