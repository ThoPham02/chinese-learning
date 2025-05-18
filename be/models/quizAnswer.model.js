const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuizAnswer = sequelize.define(
  "quiz_answer",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    question_id: { type: DataTypes.BIGINT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN },
  },
  {
    tableName: "quiz_answer",
    timestamps: false,
  }
);

module.exports = QuizAnswer;
