const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Quiz = sequelize.define(
  "Quiz",
  {
    title: DataTypes.STRING(255),
    score: DataTypes.FLOAT,
    created_at: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "quiz",
    timestamps: false,
  }
);

module.exports = Quiz;
