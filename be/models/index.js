const User = require("./user.model");
const Vocab = require("./vocab.model");
const UserVocab = require("./userVocab.model");
const ReviewLog = require("./reviewLog.model");
const Quiz = require("./quiz.model");
const QuizQuestion = require("./quizQuestion.model");
const QuizAnswer = require("./quizAnswer.model");
const LearningProgress = require("./learnProgress.model");

// Quan hệ nhiều-nhiều giữa User và Vocab qua UserVocab
User.belongsToMany(Vocab, { through: UserVocab, foreignKey: "user_id" });
Vocab.belongsToMany(User, { through: UserVocab, foreignKey: "vocabulary_id" });

// Các quan hệ bổ sung
User.hasMany(UserVocab, { foreignKey: "user_id" });
UserVocab.belongsTo(User, { foreignKey: "user_id" });

Vocab.hasMany(UserVocab, { foreignKey: "vocabulary_id" });
UserVocab.belongsTo(Vocab, { foreignKey: "vocabulary_id" });

User.hasMany(ReviewLog, { foreignKey: "user_id" });
ReviewLog.belongsTo(User, { foreignKey: "user_id" });

Vocab.hasMany(ReviewLog, { foreignKey: "vocabulary_id" });
ReviewLog.belongsTo(Vocab, { foreignKey: "vocabulary_id" });

User.hasMany(Quiz, { foreignKey: "user_id" });
Quiz.belongsTo(User, { foreignKey: "user_id" });

Quiz.hasMany(QuizQuestion, { foreignKey: "quiz_id" });
QuizQuestion.belongsTo(Quiz, { foreignKey: "quiz_id" });

QuizQuestion.hasMany(QuizAnswer, { foreignKey: "question_id" });
QuizAnswer.belongsTo(QuizQuestion, { foreignKey: "question_id" });

Vocab.hasMany(QuizQuestion, { foreignKey: "vocabulary_id" });
QuizQuestion.belongsTo(Vocab, { foreignKey: "vocabulary_id" });

User.hasOne(LearningProgress, { foreignKey: "user_id" });
LearningProgress.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Vocab,
  UserVocab,
  ReviewLog,
  Quiz,
  QuizQuestion,
  QuizAnswer,
  LearningProgress
};
