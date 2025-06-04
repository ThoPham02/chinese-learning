const express = require("express");
const router = express.Router();

const { 
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizById,
    getQuizResults,
    getQuizResultsByQuizId,
    takeQuiz,
    filterQuiz
} = require("../controllers/quiz.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, createQuiz)
router.put("/:id", auth, updateQuiz)
router.delete("/:id", auth, deleteQuiz)
router.get("/:id", auth, getQuizById)
router.post("/filter", filterQuiz)
router.get("/results", auth, getQuizResults);
router.get("/results/:id", auth, getQuizResultsByQuizId);
router.post("/submit", auth, takeQuiz);

module.exports = router;
