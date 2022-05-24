const multer = require("multer");
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/profile");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}_profile_${Date.now()}`);
  },
});

const profileUpload = multer({ storage: filestorage });
module.exports = profileUpload;
