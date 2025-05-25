const { Op } = require("sequelize");
const { UserVocab, Vocab } = require("../models");
const dayjs = require("dayjs");
const { getCurrentTime } = require("../utils/helper");

/**
 * Lấy danh sách từ mới user chưa học, theo level kèm theo meaning_option và hanzi_option
 * @param {number} userId - ID của người dùng
 * @param {number} level - cấp độ từ vựng
 * @param {number} limit - số lượng từ muốn lấy (default = 10)
 */
exports.getNewWordsByUserLevel = async (userId, level, limit = 10) => {
  try {
    // 1. Lấy danh sách id từ vựng user đã học
    const learnedIds = await UserVocab.findAll({
      where: { user_id: userId },
      attributes: ['vocabulary_id'],
      raw: true,
    });

    const excludeIds = learnedIds.map(e => e.vocabulary_id);

    // 2. Lấy tất cả từ cùng level (phục vụ cho distractor)
    const allLevelWords = await Vocab.findAll({
      where: { level },
      raw: true,
    });

    // 3. Lọc ra từ mới chưa học
    const newWords = allLevelWords
      .filter(word => !excludeIds.includes(word.id))
      .slice(0, limit);

    // 4. Hàm tạo distractors
    function getRandomOptions(wordId, levelWords, count = 3) {
      const others = levelWords.filter(w => w.id !== wordId);
      const shuffled = others.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    // 5. Gắn meaning_option và hanzi_option
    const result = newWords.map(word => {
      const distractors = getRandomOptions(word.id, allLevelWords);
      const options = [...distractors, word].sort(() => Math.random() - 0.5);

      return {
        ...word,
        meaning_option: options.map(o => o.meaning),
        hanzi_option: options.map(o => o.hanzi),
      };
    });

    return result;
  } catch (err) {
    console.error("Lỗi khi lấy từ mới:", err);
    throw err;
  }
};


/**
 * Lấy danh sách từ cần ôn theo SRS, không dùng association, có meaning_option và hanzi_option
 */
exports.getWordsToReview = async (userId, now = dayjs().unix()) => {
  try {
    // 1. Lấy danh sách từ cần ôn trong UserVocab
    const userVocabs = await UserVocab.findAll({
      where: {
        user_id: userId,
        status: { [Op.in]: [1, 2] },
        [Op.or]: [
          { next_review: null },
          { next_review: { [Op.lte]: now } },
        ],
      },
      order: [['next_review', 'ASC']],
      limit: 20,
      raw: true,
    });

    const vocabIds = userVocabs.map(u => u.vocabulary_id);

    // 2. Lấy thông tin từ bảng Vocab tương ứng
    const reviewVocabs = await Vocab.findAll({
      where: { id: { [Op.in]: vocabIds } },
      raw: true,
    });

    // 3. Lấy toàn bộ từ vựng để dùng làm nguồn gây nhiễu
    const allVocab = await Vocab.findAll({ raw: true });

    // 4. Hàm tạo distractors
    function getRandomOptions(currentId, vocabList, count = 3) {
      const others = vocabList.filter(w => w.id !== currentId);
      const shuffled = others.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    // 5. Gắn lại thông tin từ + tạo đáp án gây nhiễu
    const result = userVocabs.map(entry => {
      const word = reviewVocabs.find(w => w.id === entry.vocabulary_id);
      if (!word) return null;

      const distractors = getRandomOptions(word.id, allVocab);
      const options = [...distractors, word].sort(() => Math.random() - 0.5);

      return {
        ...entry,
        Vocab: {
          ...word,
          meaning_option: options.map(o => o.meaning),
          hanzi_option: options.map(o => o.hanzi),
        }
      };
    }).filter(Boolean);

    return result;
  } catch (err) {
    console.error("Lỗi khi lấy từ cần ôn:", err);
    throw err;
  }
};

/**
 * Cập nhật kết quả học 1 từ (đúng hoặc sai)
 */
exports.updateReviewResult = async (user_vocab_id, is_correct, current_correct_count) => {
  const now = getCurrentTime();
  const newCorrectCount = is_correct ? current_correct_count + 1 : 0;

  console.log("updateReviewResult", user_vocab_id, is_correct, current_correct_count, newCorrectCount);

  // Tính ngày ôn tiếp theo theo SRS
  const delays = [1, 3, 7, 14, 30]; // ngày
  const delay = delays[Math.min(newCorrectCount, delays.length - 1)];
  const next_review = dayjs().add(delay, 'day').unix();

  return await UserVocab.update(
    {
      correct_count: newCorrectCount,
      last_review: now,
      next_review,
      status: newCorrectCount >= 3 ? 2 : 1,
    },
    {
      where: { id: user_vocab_id },
    }
  );
};
