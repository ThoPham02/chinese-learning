const express = require("express");
const router = express.Router();

const { getWordsToLearn, getWordsToReview, updateUserVocab } = require("../controllers/vocab.controller");
const auth = require("../middleware/auth.middleware");

router.get("/learn", auth, getWordsToLearn);
router.get("/review", auth, getWordsToReview);
router.post("/update", auth, updateUserVocab);


module.exports = router;
