const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DailyTaskLog = sequelize.define("DailyTaskLog", {
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  task_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  task_date: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.BIGINT,
    defaultValue: () => Date.now(),
  },
}, {
  tableName: "daily_task_log",
  timestamps: false,
});

module.exports = DailyTaskLog;
