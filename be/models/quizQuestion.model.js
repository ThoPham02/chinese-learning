const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuizQuestion = sequelize.define(
  "quiz_question",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    quiz_id: { type: DataTypes.BIGINT, allowNull: false },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    vocabulary_id: { type: DataTypes.BIGINT },
    is_correct: { type: DataTypes.BOOLEAN },
  },
  {
    tableName: "quiz_question",
    timestamps: false,
  }
);
module.exports = QuizQuestion;
