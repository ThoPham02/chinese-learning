const { Op } = require("sequelize");
const { Vocab } = require("../models");

/**
 * Lấy danh sách từ vựng theo level, kèm meaning_option và hanzi_option
 * @param {number[]} levels - Mảng level muốn lọc (vd: [1, 2])
 */
exports.getVocabularyByLevels = async (levels) => {
  try {
    // 1. Lấy toàn bộ từ vựng theo level
    const words = await Vocab.findAll({
      where: !levels || levels.length === 0
        ? undefined
        : {
            level: levels.length === 1 ? levels[0] : { [Op.in]: levels },
          },
      order: [["id", "ASC"]],
      raw: true,
    });

    // 2. Tạo map level → danh sách từ vựng cùng level
    const levelMap = {};
    for (const word of words) {
      if (!levelMap[word.level]) levelMap[word.level] = [];
      levelMap[word.level].push(word);
    }

    // 3. Hàm lấy các lựa chọn sai cùng level, không trùng current
    function getRandomOptionsSameLevel(wordId, levelWords, count = 3) {
      const others = levelWords.filter(w => w.id !== wordId);
      const shuffled = others.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    // 4. Gắn meaning_option và hanzi_option
    const result = words.map(word => {
      const levelWords = levelMap[word.level];
      const distractors = getRandomOptionsSameLevel(word.id, levelWords);

      const options = [...distractors, word];
      const shuffled = options.sort(() => Math.random() - 0.5);

      return {
        ...word,
        meaning_option: shuffled.map(o => o.meaning),
        hanzi_option: shuffled.map(o => o.hanzi),
      };
    });

    return result;
  } catch (err) {
    console.error("Lỗi khi lấy từ vựng theo level:", err);
    throw err;
  }
};
