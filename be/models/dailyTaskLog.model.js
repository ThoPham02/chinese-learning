const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DailyTaskLog = sequelize.define(
  "daily_task_log",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    task_type: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    task_date: { type: DataTypes.DATEONLY, allowNull: false },
    number_words: { type: DataTypes.INTEGER, defaultValue: 0 },
    updated_at: { type: DataTypes.BIGINT },
  },
  {
    tableName: "daily_task_log",
    timestamps: false,
  }
);

module.exports = DailyTaskLog;
