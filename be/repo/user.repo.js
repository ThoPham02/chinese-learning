const { Op } = require("sequelize");

const { Vocab } = require("../models");

/**
 * Lấy danh sách từ vựng theo level
 * @param {number[]} levels - Mảng level muốn lọc (vd: [1, 2])
 */
exports.getVocabularyByLevels = async (levels) => {
  try {
    // neu la mang rong thi lay tat ca
    if (!levels || levels.length === 0) {
      return await Vocab.findAll({
        order: [["id", "ASC"]], // sắp xếp theo id (có thể đổi)
      });
    }
    const words = await Vocab.findAll({
      where: {
        level: levels.length === 1 ? levels[0] : { [Op.in]: levels },
      },
      order: [["id", "ASC"]], // sắp xếp theo id (có thể đổi)
    });

    return words;
  } catch (err) {
    console.error("Lỗi khi lấy từ vựng theo level:", err);
    throw err;
  }
};
