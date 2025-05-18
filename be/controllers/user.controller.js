const LearningProgress = require("../models/learnProgress.model");
const DailyTaskLog = require("../models/dailyTaskLog.model");

const apiResponse = require("../utils/apiResponse");

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

      return apiResponse(res, {
        data: {
          totalVocab: 0,
          learnedVocab: 0,
          reviewCount: 0,
          currentStreak: 0,
          lastReviewDate: currentTime,
          dailyTask: {
            learn: 0,
            review: 0,
            quiz: 0,
          },
        },
      });
    }

    // const logs = await DailyTaskLog.findAll({
    //   where: {
    //     user_id: userId,
    //     task_date: ,

    //   },
    // });



    

    return apiResponse(res, {
      data: {
        totalVocab: progress.totalVocab,
        learnedVocab: progress.learnedVocab,
        reviewCount: progress.reviewCount,
        currentStreak: progress.currentStreak,
        lastReviewDate: progress.lastReviewDate,
        dailyTask: dailyTask,
      },
    });
  } catch (err) {
    console.error(err);

    return apiResponse(res, { code: 500, mess: "Server error" });
  }
};
