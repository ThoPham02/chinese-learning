const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vocab = sequelize.define("Vocab", {
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinyin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meaning: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  example: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "VOCABULARY",
  timestamps: false,
});

module.exports = Vocab;
