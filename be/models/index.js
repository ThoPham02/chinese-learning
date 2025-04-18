const User = require("./user.model");
const Vocab = require("./vocab.model");
const UserVocab = require("./userVocab.model");

// Quan hệ nhiều-nhiều
User.belongsToMany(Vocab, { through: UserVocab, foreignKey: "UserId" });
Vocab.belongsToMany(User, { through: UserVocab, foreignKey: "VocabId" });

module.exports = {
  User,
  Vocab,
  UserVocab
};
