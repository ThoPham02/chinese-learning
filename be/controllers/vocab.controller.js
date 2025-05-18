const { Op } = require("sequelize");

const apiResponse = require("../utils/apiResponse");
const responseCode = require("../const/responseCode");

const {getVocabularyByLevels} = require("../repo/user.repo");

exports.getWordsToLearn = async (req, res) => {
  
};

exports.getWordsToReview = async (req, res) => {

};

exports.updateUserVocab = async (req, res) => {
  
};

exports.getAllVocab = async (req, res) => {
  try {
    const levels = req.query.levels ? req.query.levels.split(",").map(Number) : [];

    const words = await getVocabularyByLevels(levels);

    return apiResponse(res, {
      code: responseCode.SUCCESS.code,
      mess: responseCode.SUCCESS.mess,
      data: words,
    });
  } catch (error) {
    console.log("Error fetching vocabulary:", error);

    return apiResponse(res, {
      code: responseCode.SERVER_ERROR.code,
      mess: responseCode.SERVER_ERROR.mess,
    });
  }
}
