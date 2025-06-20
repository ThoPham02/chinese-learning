const apiResponse = require("../utils/apiResponse");
const responseCode = require("../const/responseCode");

const quizService = require("../repo/quiz.repo");


// lấy danh sách quiz
exports.filterQuiz = async (req, res) => {
    try {
        const { level, search } = req.query;
        const quizzes = await quizService.getAllQuizzes(level, search);
        
        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: quizzes,
        });
    } catch (error) {
        console.error("Error in getAllQuizzes:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// thêm mới quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, time, level, num, questions } = req.body;

        // Validate input
        if (!title || !time || !level || !num || !questions || questions.length === 0) {
            return apiResponse(res, {
                code: responseCode.BAD_REQUEST.code,
                mess: responseCode.BAD_REQUEST.mess,
            });
        }

        // Create quiz
        const newQuiz = await quizService.createQuiz({
            title,
            time,
            level,
            num,
            questions
        });

        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: newQuiz
        });
    } catch (error) {
        console.error("Error in createQuiz:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// cập nhật quiz
exports.updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, time, level, num, questions } = req.body;

        // Validate input
        if (!title || !time || !level || !questions || questions.length === 0) {
            return apiResponse(res, {
                code: responseCode.BAD_REQUEST.code,
                mess: responseCode.BAD_REQUEST.mess,
            });
        }

        // Update quiz
        const updatedQuiz = await quizService.updateQuiz(id, {
            title,
            time,
            level,
            num,
            questions
        });

        if (!updatedQuiz) {
            return apiResponse(res, {
                code: responseCode.NOT_FOUND.code,
                mess: responseCode.NOT_FOUND.mess,
            });
        }

        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: updatedQuiz
        });
    } catch (error) {
        console.error("Error in updateQuiz:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// xóa quiz
exports.deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return apiResponse(res, {
                code: responseCode.BAD_REQUEST.code,
                mess: responseCode.BAD_REQUEST.mess,
            });
        }

        // Delete quiz
        const deletedQuiz = await quizService.deleteQuiz(id);

        if (!deletedQuiz) {
            return apiResponse(res, {
                code: responseCode.NOT_FOUND.code,
                mess: responseCode.NOT_FOUND.mess,
            });
        }

        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: deletedQuiz
        });
    } catch (error) {
        console.error("Error in deleteQuiz:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// lấy chi tiết quiz
exports.getQuizById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return apiResponse(res, {
                code: responseCode.BAD_REQUEST.code,
                mess: responseCode.BAD_REQUEST.mess,
            });
        }

        // Get quiz by ID
        const quiz = await quizService.getQuizById(id);
        if (!quiz) {
            return apiResponse(res, {
                code: responseCode.NOT_FOUND.code,
                mess: responseCode.NOT_FOUND.mess,
            });
        }

        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: quiz
        });
    } catch (error) {
        console.error("Error in getQuizById:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// lấy kết quả quiz theo userId
exports.getQuizResults = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in getQuizResultsByUserId:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// lấy chi tiết kết quả quiz theo quizId
exports.getQuizResultsByQuizId = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in getQuizResultsByQuizId:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// làm quiz
exports.takeQuiz = async (req, res) => {
    try {
        console.log("takeQuiz called with body:", req.body);
        const { quizId, answers } = req.body;
        const userId = req.userId;

        // Validate input
        if (!quizId || !userId || !answers || answers.length === 0) {
            return apiResponse(res, {
                code: responseCode.INVALID_INPUT.code,
                mess: responseCode.INVALID_INPUT.mess,
            });
        }

        // Process quiz submission
        const result = await quizService.submitQuiz(quizId, userId, answers);

        if (!result) {
            return apiResponse(res, {
                code: responseCode.NOT_FOUND.code,
                mess: responseCode.NOT_FOUND.mess,
            });
        }

        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: result
        });
    } catch (error) {
        console.error("Error in takeQuiz:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
};

// lấy danh sách quiz của user
exports.getUserQuizzes = async (req, res) => {
    try {
        const userId = req.userId;

        // Validate input
        if (!userId) {
            return apiResponse(res, {
                code: responseCode.BAD_REQUEST.code,
                mess: responseCode.BAD_REQUEST.mess,
            });
        }

        // Get user quizzes
        const quizzes = await quizService.getUserQuizzes(userId);

        console.log("User quizzes:", quizzes);

        return apiResponse(res, {
            code: responseCode.SUCCESS.code,
            mess: responseCode.SUCCESS.mess,
            data: quizzes
        });
    } catch (error) {
        console.error("Error in getUserQuizzes:", error);

        return apiResponse(res, {
            code: responseCode.SERVER_ERROR.code,
            mess: responseCode.SERVER_ERROR.mess,
        });
    }
}