const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LearnProgress = sequelize.define(
  "learning_progress",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    learned_words: { type: DataTypes.INTEGER, defaultValue: 0 },
    reviewed_words: { type: DataTypes.INTEGER, defaultValue: 0 },
    mastered_words: { type: DataTypes.INTEGER, defaultValue: 0 },
    current_streak: { type: DataTypes.INTEGER, defaultValue: 0 },
    last_active_date: { type: DataTypes.BIGINT },
  },
  {
    tableName: "learning_progress",
    timestamps: false,
  }
);

module.exports = LearnProgress;
