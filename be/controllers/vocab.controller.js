const { Op } = require("sequelize");
const dayjs = require("dayjs");

const apiResponse = require("../utils/apiResponse");
const responseCode = require("../const/responseCode");

const LearningProgress = require("../models/learnProgress.model");
const { getVocabularyByLevels } = require("../repo/user.repo");
const vocabService = require("../repo/userVoca.repo");
const { UserVocab } = require("../models");

// 1. Lấy từ mới để học
exports.getWordsToLearn = async (req, res) => {
  const { userId } = req;

  const progress = await LearningProgress.findOne({
    where: { user_id: userId },
  });
  const level = progress ? progress.level : 1;

  console.log("getWordsToLearn", userId, level);

  if (!userId || !level) {
    return apiResponse(res, {
      code: responseCode.INVALID_INPUT.code,
      mess: "Thiếu userId hoặc level",
    });
  }

  try {
    const words = await vocabService.getNewWordsByUserLevel(userId, level);

    const dataRes = words.map((word) => ({
      id: word.id,
      level: word.level,
      hanzi: word.hanzi,
      pinyin: word.pinyin,
      meaning: word.meaning,
      exampleVn: word.example_vi,
      exampleCn: word.example_cn,
      examplePinyin: word.example_pinyin,
      meaningOption: word.meaning_option || [],
      hanziOption: word.hanzi_option || [],
    }));

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: dataRes,
    });
  } catch (err) {
    console.error("Lỗi khi lấy từ mới:", err);
    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};

// 2. Lấy từ cần ôn
exports.getWordsToReview = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return apiResponse(res, {
      code: responseCode.INVALID_INPUT.code,
      mess: "Thiếu userId",
    });
  }

  try {
    const rows = await vocabService.getWordsToReview(userId);

    // Tạo levelMap
    const levelMap = {};
    for (const item of rows) {
      const level = item.Vocab.level;
      if (!levelMap[level]) levelMap[level] = [];
      levelMap[level].push(item.Vocab);
    }

    const getRandomOptionsSameLevel = (vocabId, levelWords, count = 3) => {
      const others = levelWords.filter((w) => w.id !== vocabId);
      return others.sort(() => Math.random() - 0.5).slice(0, count);
    };

    const dataRes = rows.map((row) => {
      const word = row.Vocab;
      const levelWords = levelMap[word.level] || [];
      const distractors = getRandomOptionsSameLevel(word.id, levelWords);
      const options = [...distractors, word].sort(() => Math.random() - 0.5);

      return {
        id: word.id,
        level: word.level,
        hanzi: word.hanzi,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleVn: word.example_vi,
        exampleCn: word.example_cn,
        examplePinyin: word.example_pinyin,
        meaningOption: options.map((o) => o.meaning),
        hanziOption: options.map((o) => o.hanzi),
      };
    });

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: dataRes,
    });
  } catch (err) {
    console.error("Lỗi khi lấy từ cần ôn:", err);
    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};

exports.updateUserVocab = async (req, res) => {
  const { userId } = req;
  const { wordId, isCorrect } = req.body;

  if (!wordId || typeof isCorrect !== "boolean") {
    return apiResponse(res, {
      code: responseCode.INVALID_INPUT.code,
      mess: "Thiếu user_vocab_id hoặc is_correct không hợp lệ",
    });
  }

  try {
    let userVocab = await UserVocab.findOne({
      where: {
        user_id: userId,
        vocabulary_id: wordId,
      },
    });
    if (!userVocab) {
      // 2. Nếu chưa có thì tạo mới
      if (!userVocab) {
        userVocab = await UserVocab.create({
          user_id: userId,
          vocabulary_id: wordId,
          correct_count: 0,
          status: 1, // đang học
          next_review: null,
        });

        // update user progress
        const progress = await LearningProgress.findOne({
          where: { user_id: userId },
        });
        if (progress) {
          await progress.increment("learned_words");
        } else {
          await LearningProgress.create({
            user_id: userId,
            level: 1,
            learned_words: 1,
            reviewed_words: 0,
            mastered_words: 0,
          });
        }
      }
    }

    const nextReview = await vocabService.updateReviewResult(
      userVocab.id,
      isCorrect,
      userVocab.correct_count
    );

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: {
        next_review: nextReview
          ? dayjs(nextReview).format("YYYY-MM-DD HH:mm:ss")
          : null,
      },
    });
  } catch (err) {
    console.error(err);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};

exports.getAllVocab = async (req, res) => {
  try {
    const levels = req.query.levels
      ? req.query.levels.split(",").map(Number)
      : [];

    const words = await getVocabularyByLevels(levels);

    const dataRes = words.map((word) => {
      return {
        id: word.id,
        level: word.level,
        hanzi: word.hanzi,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleVn: word.example_vi,
        exampleCn: word.example_cn,
        examplePinyin: word.example_pinyin,
        meaningOption: word.meaning_option,
        hanziOption: word.hanzi_option,
      };
    });

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: dataRes,
    });
  } catch (error) {
    console.log("Error fetching vocabulary:", error);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};
