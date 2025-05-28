const { Op } = require("sequelize"); // đảm bảo bạn đã import Op
const Vocab = require("../models/vocab.model"); // import model Vocab

exports.getVocabularyByLevels = async (levels, search) => {
  try {
    // 1. Xây dựng điều kiện where cho levels và search
    const whereConditions = {};

    if (levels && levels.length > 0) {
      whereConditions.level = { [Op.in]: levels };
    }

    if (search && search.trim() !== "") {
      whereConditions[Op.or] = [
        { meaning: { [Op.like]: `%${search}%` } },
        { hanzi: { [Op.like]: `%${search}%` } },
      ];
    }

    // 2. Lấy toàn bộ từ vựng theo điều kiện where
    const words = await Vocab.findAll({
      where: Object.keys(whereConditions).length === 0 ? undefined : whereConditions,
      order: [["id", "ASC"]],
      raw: true,
    });

    // 3. Tạo map level → danh sách từ vựng cùng level
    const levelMap = {};
    for (const word of words) {
      if (!levelMap[word.level]) levelMap[word.level] = [];
      levelMap[word.level].push(word);
    }

    // 4. Hàm lấy các lựa chọn sai cùng level, không trùng current
    function getRandomOptionsSameLevel(wordId, levelWords, count = 3) {
      const others = levelWords.filter(w => w.id !== wordId);
      const shuffled = others.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    // 5. Gắn meaning_option và hanzi_option
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