const LearningProgress = require("../models/learnProgress.model");
const DailyTaskLog = require("../models/dailyTaskLog.model");

const apiResponse = require("../utils/apiResponse");
const { getCurrentTime } = require("../utils/helper");
const e = require("express");

exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const currentTime = getCurrentTime();

    // Fetch the user's learning progress
    let progress = await LearningProgress.findOne({
      where: { user_id: userId },
    });

    if (!progress) {
      progress = {
        id: null,
        user_id: userId,
        level: 1,
        learned_words: 0,
        reviewed_words: 0,
        mastered_words: 0,
        current_streak: 0,
        last_active_date: currentTime,
      }

      LearningProgress.create(progress);

      return apiResponse(res, {
        data: {
          ...progress,
          dailyTask: {
            learn: 0,
            review: 0,
            quiz: 0,
          },
        },
      });
    }
    

    return apiResponse(res, {
      data: {
        id: progress.id,
        userId: progress.user_id,
        level: progress.level,
        learnedWords: progress.learned_words,
        reviewedWords: progress.reviewed_words,
        masteredWords: progress.mastered_words,
        currentStreak: progress.current_streak,
        lastActiveDate: progress.last_active_date,
        dailyTask: {
          learn: progress.daily_task_learn || 0,
          review: progress.daily_task_review || 0,
          quiz: progress.daily_task_quiz || 0,
        },
      },
    });
  } catch (err) {
    console.error(err);

    return apiResponse(res, { code: 500, mess: "Server error" });
  }
};

exports.updateProgress = async (req, res) => {
  
}