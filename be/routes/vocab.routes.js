const express = require("express");
const router = express.Router();

const {
  getWordsToLearn,
  getWordsToReview,
  updateUserVocab,
  getAllVocab,
  createWord,
  updateWord,
  deleteWord,
  getWordsById,
  getWordsByUser,
} = require("../controllers/vocab.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, createWord)
router.put("/:id", auth, updateWord)
router.delete("/:id", auth, deleteWord)
// router.get("/:id", auth, getWordsById);
router.get("/learn", auth, getWordsToLearn);
router.get("/review", auth, getWordsToReview);
router.post("/update", auth, updateUserVocab);
router.get("/filter", getAllVocab)
router.get("/user", auth, getWordsByUser);

module.exports = router;
