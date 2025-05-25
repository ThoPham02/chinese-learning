const { Op } = require("sequelize");
const dayjs = require('dayjs');

const apiResponse = require("../utils/apiResponse");
const responseCode = require("../const/responseCode");

const {getVocabularyByLevels} = require("../repo/user.repo");
const vocabService = require('../repo/userVoca.repo');

// 1. Lấy từ mới để học
exports.getWordsToLearn = async (req, res) => {
  // const { userId, level } = req.query;
  // if (!userId || !level) {
  //   return apiResponse(res, {
  //     code: responseCode.BAD_REQUEST.code,
  //     mess: 'Thiếu userId hoặc level',
  //   });
  // }

  // try {
  //   const words = await vocabService.getNewWordsByUserLevel(userId, level);

  //   const dataRes = words.map(word => ({
  //     id: word.id,
  //     level: word.level,
  //     hanzi: word.hanzi,
  //     pinyin: word.pinyin,
  //     meaning: word.meaning,
  //     exampleVn: word.example_vi,
  //     exampleCn: word.example_cn,
  //     examplePinyin: word.example_pinyin,
  //     meaningOption: [], // Không có distractor vì đây là từ mới
  //     hanziOption: [],
  //   }));

  //   return apiResponse(res, {
  //     code: responseCode.SUCCESS.code,
  //     mess: responseCode.SUCCESS.mess,
  //     data: dataRes,
  //   });
  // } catch (err) {
  //   console.error('Lỗi khi lấy từ mới:', err);
  //   return apiResponse(res, {
  //     code: responseCode.SERVER_ERROR.code,
  //     mess: responseCode.SERVER_ERROR.mess,
  //   });
  // }
};

// 2. Lấy từ cần ôn
exports.getWordsToReview = async (req, res) => {
  // const { userId } = req.query;
  // if (!userId) {
  //   return apiResponse(res, {
  //     code: responseCode.BAD_REQUEST.code,
  //     mess: 'Thiếu userId',
  //   });
  // }

  // try {
  //   const rows = await vocabService.getWordsToReview(userId);

  //   // Tạo levelMap
  //   const levelMap = {};
  //   for (const item of rows) {
  //     const level = item.Vocab.level;
  //     if (!levelMap[level]) levelMap[level] = [];
  //     levelMap[level].push(item.Vocab);
  //   }

  //   const getRandomOptionsSameLevel = (vocabId, levelWords, count = 3) => {
  //     const others = levelWords.filter(w => w.id !== vocabId);
  //     return others.sort(() => Math.random() - 0.5).slice(0, count);
  //   };

  //   const dataRes = rows.map(row => {
  //     const word = row.Vocab;
  //     const levelWords = levelMap[word.level] || [];
  //     const distractors = getRandomOptionsSameLevel(word.id, levelWords);
  //     const options = [...distractors, word].sort(() => Math.random() - 0.5);

  //     return {
  //       id: word.id,
  //       level: word.level,
  //       hanzi: word.hanzi,
  //       pinyin: word.pinyin,
  //       meaning: word.meaning,
  //       exampleVn: word.example_vi,
  //       exampleCn: word.example_cn,
  //       examplePinyin: word.example_pinyin,
  //       meaningOption: options.map(o => o.meaning),
  //       hanziOption: options.map(o => o.hanzi),
  //     };
  //   });

  //   return apiResponse(res, {
  //     code: responseCode.SUCCESS.code,
  //     mess: responseCode.SUCCESS.mess,
  //     data: dataRes,
  //   });
  // } catch (err) {
  //   console.error('Lỗi khi lấy từ cần ôn:', err);
  //   return apiResponse(res, {
  //     code: responseCode.SERVER_ERROR.code,
  //     mess: responseCode.SERVER_ERROR.mess,
  //   });
  // }
};

exports.updateUserVocab = async (req, res) => {
  const { user_vocab_id, is_correct } = req.body;
  if (!user_vocab_id || typeof is_correct !== 'boolean') {
    return res.status(400).json({ message: 'Missing or invalid parameters' });
  }

  try {
    const userVocab = await require('../models').UserVocabulary.findByPk(user_vocab_id);
    if (!userVocab) return res.status(404).json({ message: 'Not found' });

    const nextReview = await vocabService.updateReviewResult(
      user_vocab_id,
      is_correct,
      userVocab.correct_count
    );

    res.json({ message: 'Updated', next_review: nextReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllVocab = async (req, res) => {
  try {
    const levels = req.query.levels ? req.query.levels.split(",").map(Number) : [];

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
}
