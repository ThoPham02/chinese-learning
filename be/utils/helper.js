const dayjs = require("dayjs");

exports.getCurrentTime = () => {
    return dayjs().unix();
}

