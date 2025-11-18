const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdf");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});

const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() !== ".pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
