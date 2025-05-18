const User = require("./user.model");
const Vocab = require("./vocab.model");
const UserVocab = require("./userVocab.model");
const ReviewLog = require("./reviewLog.model");
const Quiz = require("./quiz.model");
const QuizQuestion = require("./quizQuestion.model");
const QuizAnswer = require("./quizAnswer.model");
const LearningProgress = require("./learnProgress.model");
const DailyTaskLog = require("./dailyTaskLog.model");

module.exports = {
  User,
  Vocab,
  UserVocab,
  ReviewLog,
  Quiz,
  QuizQuestion,
  QuizAnswer,
  LearningProgress,
  DailyTaskLog,
};
