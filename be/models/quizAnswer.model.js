const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuizAnswer = sequelize.define(
  "QuizAnswer",
  {
    content: DataTypes.TEXT,
    is_correct: DataTypes.BOOLEAN,
  },
  {
    tableName: "quiz_answer",
    timestamps: false,
  }
);

module.exports = QuizAnswer;
