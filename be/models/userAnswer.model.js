const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserAnswer = sequelize.define(
  "user_answer",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    quiz_id: { type: DataTypes.BIGINT, allowNull: false },
    vocabulary_id: { type: DataTypes.BIGINT, allowNull: false },
    type: { type: DataTypes.BIGINT, allowNull: false },
    is_correct: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "user_answer",
    timestamps: false,
  }
);

module.exports = UserAnswer;