const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuizQuestion = sequelize.define(
  "QuizQuestion",
  {
    question_text: DataTypes.TEXT,
    is_correct: DataTypes.BOOLEAN,
  },
  {
    tableName: "quiz_question",
    timestamps: false,
  }
);

module.exports = QuizQuestion;
