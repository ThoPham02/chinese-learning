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
}
