const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Quiz = sequelize.define(
  "quiz",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    title: { type: DataTypes.STRING(255) },
    score: { type: DataTypes.FLOAT },
    created_at: { type: DataTypes.BIGINT },
  },
  {
    tableName: "quiz",
    timestamps: false,
  }
);

module.exports = Quiz;
