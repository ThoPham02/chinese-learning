const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ReviewLog = sequelize.define(
  "review_log",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    vocabulary_id: { type: DataTypes.BIGINT, allowNull: false },
    review_time: { type: DataTypes.BIGINT },
    is_correct: { type: DataTypes.BOOLEAN },
    attempt: { type: DataTypes.INTEGER },
  },
  {
    tableName: "review_log",
    timestamps: false,
  }
);

module.exports = ReviewLog;
