const { Op } = require("sequelize");
const dayjs = require("dayjs");

const apiResponse = require("../utils/apiResponse");
const responseCode = require("../const/responseCode");

const LearningProgress = require("../models/learnProgress.model");
const { getVocabularyByLevels } = require("../repo/user.repo");
const vocabService = require("../repo/userVoca.repo");
const { UserVocab, Vocab } = require("../models");

// 1. Lấy từ mới để học
exports.getWordsToLearn = async (req, res) => {
  const { userId } = req;

  const progress = await LearningProgress.findOne({
    where: { user_id: userId },
  });
  const level = progress ? progress.level : 1;

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
    const search = req.query.search || "";
    const orderBy = req.query.orderBy || "id";
    const orderDes = req.query.orderDes || "ASC";

    const words = await getVocabularyByLevels(
      levels,
      search,
      orderBy,
      orderDes
    );

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
        explain: word.explain,
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

exports.createWord = async (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const {
      hanzi,
      pinyin,
      meaning,
      exampleVn,
      exampleCn,
      examplePinyin,
      level,
      explain,
    } = req.body;

    // kiem tra tu da ton tai chua
    const existingWord = await Vocab.findOne({
      where: {
        hanzi,
      },
    });
    if (existingWord) {
      return apiResponse(res, {
        code: responseCode.INVALID_INPUT.code,
        mess: "Từ vựng đã tồn tại",
      });
    }

    // insert từ mới vào cơ sở dữ liệu
    const newWord = await Vocab.create({
      level,
      hanzi,
      pinyin,
      meaning,
      example_vi: exampleVn,
      example_cn: exampleCn,
      example_pinyin: examplePinyin,
      explain,
    });

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: newWord,
    });
  } catch (error) {
    console.log("Error fetching vocabulary:", error);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hanzi,
      pinyin,
      meaning,
      exampleVn,
      exampleCn,
      examplePinyin,
      level,
      explain,
    } = req.body;

    // Kiểm tra từ vựng có tồn tại không
    const existingWord = await Vocab.findOne({
      where: {
        id,
      },
    });
    if (!existingWord) {
      return apiResponse(res, {
        code: responseCode.NOT_FOUND.code,
        mess: "Từ vựng không tồn tại",
      });
    }

    // Kiểm tra từ vựng có trùng lặp không
    const duplicateWord = await Vocab.findOne({
      where: {
        hanzi,
        id: { [Op.ne]: id }, // loại trừ từ hiện tại
      },
    });
    if (duplicateWord) {
      return apiResponse(res, {
        code: responseCode.INVALID_INPUT.code,
        mess: "Từ vựng đã tồn tại",
      });
    }

    // Cập nhật từ vựng
    const updatedWord = await Vocab.update(
      {
        level,
        hanzi,
        pinyin,
        meaning,
        example_vi: exampleVn,
        example_cn: exampleCn,
        example_pinyin: examplePinyin,
        explain,
      },
      { where: { id } }
    );

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: updatedWord,
    });
  } catch (error) {
    console.error("Error updating word:", error);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra từ vựng có tồn tại không
    const existingWord = await Vocab.findOne({
      where: {
        id,
      },
    });
    if (!existingWord) {
      return apiResponse(res, {
        code: responseCode.NOT_FOUND.code,
        mess: "Từ vựng không tồn tại",
      });
    }

    // kiểm tra từ vựng có đang được sử dụng trong user_voca không
    const userVocabCount = await UserVocab.count({
      where: {
        vocabulary_id: id,
      },
    });
    if (userVocabCount > 0) {
      return apiResponse(res, {
        code: responseCode.INVALID_INPUT.code,
        mess: "Từ vựng đang được sử dụng trong học viên, không thể xóa",
      });
    }

    // Xóa từ vựng
    await Vocab.destroy({
      where: {
        id,
      },
    });

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: null,
    });
  } catch (error) {
    console.error("Error deleting word:", error);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};

// Lấy từ theo id
exports.getWordsById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse(res, {
      code: responseCode.INVALID_INPUT.code,
      mess: "Thiếu id từ vựng",
    });
  }

  try {
    const word = await vocabService.getVocabularyById(id);

    const dataRes = {
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
      explain: word.explain,
    };

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: dataRes,
    });
  } catch (error) {
    console.error("Error fetching word by ID:", error);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
};
