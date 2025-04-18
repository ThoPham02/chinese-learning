const { Op } = require("sequelize");

const Vocab = require("../models/vocab.model");
const User = require("../models/user.model");
const UserVocab = require("../models/userVocab.model");

exports.getWordsToLearn = async (req, res) => {
  try {
    const userId = req.userId;

    // Lấy ra các từ mà user chưa học (chưa có trong bảng UserVocab)
    const learnedVocabIds = await UserVocab.findAll({
      where: { UserId: userId },
      attributes: ["VocabId"]
    });

    const learnedIds = learnedVocabIds.map(item => item.VocabId);

    const newWords = await Vocab.findAll({
      where: learnedIds.length > 0 ? {
        id: { [require("sequelize").Op.notIn]: learnedIds }
      } : {},
      limit: 10 // mỗi lần học 10 từ mới
    });

    res.json({ words: newWords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWordsToReview = async (req, res) => {
  try {
    const userId = req.userId;
    const today = new Date();

    const reviewData = await UserVocab.findAll({
      where: {
        UserId: userId,
        status: "review",
        lastReviewDate: { [Op.lte]: today }
      },
      include: [Vocab],
      limit: 10
    });

    const words = reviewData.map(item => ({
      ...item.Vocab.dataValues,
      reviewCount: item.reviewCount,
      lastReviewDate: item.lastReviewDate
    }));

    res.json({ words });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserVocab = async (req, res) => {
  try {
    const userId = req.userId;
    const { vocabId, status } = req.body;

    const [userVocab, created] = await UserVocab.findOrCreate({
      where: { UserId: userId, VocabId: vocabId },
      defaults: {
        status,
        lastReviewDate: new Date(),
        reviewCount: 1
      }
    });

    if (!created) {
      userVocab.status = status;
      userVocab.lastReviewDate = new Date();
      userVocab.reviewCount += 1;
      await userVocab.save();
    }

    res.json({ message: "Updated", data: userVocab });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

