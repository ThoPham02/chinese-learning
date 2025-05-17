const UserVocab = require("../models/userVocab.model");
const LearningProgress = require("../models/learnProgress.model");

exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const currentTime = new Date();

    // Fetch the user's learning progress
    const progress = await LearningProgress.findOne({
      where: { userId },
      attributes: [
        "totalVocab",
        "learnedVocab",
        "reviewCount",
        "currentStreak",
        "lastReviewDate",
      ],
    });
    if (!progress) {
      LearningProgress.create({
        userId,
        totalVocab: 0,
        learnedVocab: 0,
        reviewCount: 0,
        currentStreak: 0,
        lastReviewDate: currentTime,
      });
    }

    // Fetch the user's vocabularies
  } catch (err) {
    console.error(err);

    return apiResponse(res, { code: 500, mess: "Server error" });
  }
};
