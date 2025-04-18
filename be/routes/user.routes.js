const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { getProgress } = require("../controllers/user.controller");

router.get("/progress", auth, getProgress);

module.exports = router;
