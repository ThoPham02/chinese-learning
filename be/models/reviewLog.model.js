const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ReviewLog = sequelize.define(
  "ReviewLog",
  {
    review_time: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    is_correct: DataTypes.BOOLEAN,
    attempt: DataTypes.INTEGER,
  },
  {
    tableName: "review_log",
    timestamps: false,
  }
);

module.exports = ReviewLog;
