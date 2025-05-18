const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserVocab = sequelize.define(
  "user_vocabulary",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    vocabulary_id: { type: DataTypes.BIGINT, allowNull: false },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0, max: 3 },
    },
    correct_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    last_review: { type: DataTypes.BIGINT },
    next_review: { type: DataTypes.BIGINT },
    created_at: { type: DataTypes.BIGINT },
  },
  {
    tableName: "user_vocabulary",
    timestamps: false,
  }
);

module.exports = UserVocab;
