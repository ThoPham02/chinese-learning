// utils/apiResponse.js
module.exports = function apiResponse(res, { code = 0, mess = "Success", data = null }) {
  return res.status(200).json({ code, mess, data });
};
