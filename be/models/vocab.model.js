const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vocabulary = sequelize.define(
  "Vocabulary",
  {
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hanzi: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    pinyin: DataTypes.STRING(100),
    meaning_vi: DataTypes.TEXT,
    example_vi: DataTypes.TEXT,
    audio_url: DataTypes.STRING(255),
  },
  {
    tableName: "vocabulary",
    timestamps: false,
  }
);

module.exports = Vocabulary;
