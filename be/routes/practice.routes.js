const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { pronunciation, feedback } = require("../controllers/practice.controller");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedExts = ['.flac', '.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.ogg', '.opus', '.wav', '.webm'];

  if (!allowedExts.includes(ext)) {
    return cb(new Error("Định dạng file không hợp lệ."));
  }

  if (ext === '.m4a' && file.mimetype === 'audio/mp4') {
    file.mimetype = 'audio/m4a';
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

router.post("/pronunciation", upload.single("file"), pronunciation);
router.post("/pronunciation/feedback", upload.single("file"), feedback);
module.exports = router;
