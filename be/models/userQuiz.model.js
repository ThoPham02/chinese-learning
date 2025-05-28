const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserQuiz = sequelize.define(
  "user_quiz",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    quiz_id: { type: DataTypes.BIGINT, allowNull: false },
    score: { type: DataTypes.BIGINT, allowNull: false },
    created_at: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "user_quiz",
    timestamps: false,
  }
);

module.exports = UserQuiz;
