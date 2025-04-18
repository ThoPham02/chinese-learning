const UserVocab = require("../models/userVocab.model");

exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;

    const [newCount, learningCount, reviewCount] = await Promise.all([
      UserVocab.count({ where: { UserId: userId, status: "new" } }),
      UserVocab.count({ where: { UserId: userId, status: "learning" } }),
      UserVocab.count({ where: { UserId: userId, status: "review" } }),
    ]);

    res.json({
      new: newCount,
      learning: learningCount,
      review: reviewCount,
      total: newCount + learningCount + reviewCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
