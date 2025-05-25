const User = require("../models/user.model");
const LearningProgress = require("../models/learnProgress.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");

exports.register = async (req, res) => {
  console.log("Register request body:", req.body);

  const { username, email, password } = req.body;
  try {
    console.log("Registering user:", { username, email, password });

    const hashed = await bcrypt.hash(password, 10);
    const currentTime = new Date();

    const user = await User.create({ username, email, password_hash: hashed, createdAt: currentTime });
    const learnProgress = await LearningProgress.create({
      user_id: user.id,
      totalVocab: 0,
      learnedVocab: 0,
      reviewCount: 0,
      currentStreak: 0,
      lastReviewDate: currentTime,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    return apiResponse(res, {
      data: {
        user: { id: user.id, username: user.username, email: user.email },
        token,
      },
    });

  } catch (err) {
    console.error(err);

    return apiResponse(res, { code: 500, mess: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return apiResponse(res, { code: 1, mess: "User not found" });
    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return apiResponse(res, { code: 2, mess: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return apiResponse(res, {
      data: {
        user: { id: user.id, username: user.username, email: user.email },
        token,
      },
    });
  } catch (err) {
    console.error(err);

    return apiResponse(res, { code: 500, mess: "Server error" });
  }
};
