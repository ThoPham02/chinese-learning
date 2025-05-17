const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.BIGINT,
      defaultValue: () => Date.now(),
    },
    last_login: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
