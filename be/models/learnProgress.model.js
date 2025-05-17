const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LearningProgress = sequelize.define(
  "LearnProgress",
  {
    learned_words: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    reviewed_words: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mastered_words: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    current_streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_active_date: DataTypes.BIGINT,
  },
  {
    tableName: "learn_progress",
    timestamps: false,
  }
);

module.exports = LearningProgress;
