const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash: hashed });

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
