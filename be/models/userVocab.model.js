const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./user.model");
const Vocab = require("./vocab.model");

const UserVocab = sequelize.define("UserVocab", {
  status: {
    type: DataTypes.ENUM("new", "learning", "review"),
    defaultValue: "new"
  },
  lastReviewDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: "USER_VOCAB",
  timestamps: false
});

// Thiết lập quan hệ nhiều-nhiều
User.belongsToMany(Vocab, {
  through: UserVocab,
  foreignKey: "UserId",
  otherKey: "VocabId"
});

Vocab.belongsToMany(User, {
  through: UserVocab,
  foreignKey: "VocabId",
  otherKey: "UserId"
});

module.exports = UserVocab;
