const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuizQuestion = sequelize.define(
  "quiz_question",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    quiz_id: { type: DataTypes.BIGINT, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false },
    vocabulary_id: { type: DataTypes.BIGINT, allowNull: false },
    type: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "quiz_question",
    timestamps: false,
  }
);
module.exports = QuizQuestion;
