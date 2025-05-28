const { Sequelize } = require("sequelize");

const User = require("./user.model");
const LearningProgress = require("./learnProgress.model");
const DailyTaskLog = require("./dailyTaskLog.model");
const ReviewLog = require("./reviewLog.model");

const Vocab = require("./vocab.model");
const UserVocab = require("./userVocab.model");

const Quiz = require("./quiz.model");
const QuizQuestion = require("./quizQuestion.model");
const UserAnswer = require("./userAnswer.model");
const UserQuiz = require("./userQuiz.model");

module.exports = {
  User,
  Vocab,
  UserVocab,
  ReviewLog,
  Quiz,
  QuizQuestion,
  UserAnswer,
  UserQuiz,
  LearningProgress,
  DailyTaskLog,
};
