const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Quiz = sequelize.define(
  "quiz",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255) },
    time: { type: DataTypes.BIGINT },
    level: { type: DataTypes.BIGINT },
    num: { type: DataTypes.BIGINT },
  },
  {
    tableName: "quiz",
    timestamps: false,
  }
);

module.exports = Quiz;
