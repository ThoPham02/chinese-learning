const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserVocabulary = sequelize.define(
  "UserVocabulary",
  {
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    correct_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_review: DataTypes.BIGINT,
    next_review: DataTypes.BIGINT,
    created_at: {
      type: DataTypes.BIGINT,
      defaultValue: () => Date.now(),
    },
  },
  {
    tableName: "user_vocabulary",
    timestamps: false,
  }
);

module.exports = UserVocabulary;
