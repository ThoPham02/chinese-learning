const { Op } = require("sequelize");
const { UserVocabulary, Vocab } = require("../models");
const dayjs = require("dayjs");

/**
 * Lấy danh sách từ mới user chưa học, theo level
 */
exports.getNewWordsByUserLevel = async (userId, level, limit = 10) => {
  const learnedIds = await UserVocabulary.findAll({
    where: { user_id: userId },
    attributes: ['vocabulary_id'],
    raw: true,
  });

  const excludeIds = learnedIds.map(e => e.vocabulary_id);

  return await Vocab.findAll({
    where: {
      level,
      id: excludeIds.length > 0 ? { [Op.notIn]: excludeIds } : { [Op.ne]: null }
    },
    limit,
    order: [['id', 'ASC']],
    raw: true,
  });
};

/**
 * Lấy danh sách từ cần ôn trong ngày theo SRS
 */
exports.getWordsToReview = async (userId, now = dayjs().unix()) => {
  return await UserVocabulary.findAll({
    where: {
      user_id: userId,
      status: { [Op.in]: [1, 2] },
      [Op.or]: [
        { next_review: null },
        { next_review: { [Op.lte]: now } },
      ]
    },
    include: [{ model: Vocab }],
    order: [['next_review', 'ASC']],
    limit: 20,
    raw: true,
    nest: true,
  });
};

/**
 * Cập nhật kết quả học 1 từ (đúng hoặc sai)
 */
exports.updateReviewResult = async (user_vocab_id, is_correct, current_correct_count) => {
  const now = dayjs().unix();
  const newCorrectCount = is_correct ? current_correct_count + 1 : 0;

  // Tính ngày ôn tiếp theo theo SRS
  const delays = [1, 3, 7, 14, 30]; // ngày
  const delay = delays[Math.min(newCorrectCount, delays.length - 1)];
  const next_review = dayjs().add(delay, 'day').unix();

  await UserVocabulary.update(
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

  return next_review;
};
