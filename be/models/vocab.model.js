const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vocab = sequelize.define(
  "vocabulary",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 6 },
    },
    hanzi: { type: DataTypes.STRING(20), allowNull: false },
    pinyin: { type: DataTypes.STRING(100) },
    meaning: { type: DataTypes.TEXT },
    example_vi: { type: DataTypes.TEXT },
    example_cn: { type: DataTypes.TEXT },
    example_pinyin: { type: DataTypes.TEXT },
    audio_url: { type: DataTypes.STRING(255) },
  },
  {
    tableName: "vocabulary",
    timestamps: false,
  }
);

module.exports = Vocab;
