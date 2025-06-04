const { Op } = require("sequelize"); // đảm bảo bạn đã import Op
const quiz = require("../models/quiz.model"); // import model quiz
const quizQuestion = require("../models/quizQuestion.model"); // import model quizQuestion
const Vocab = require("../models/vocab.model"); // import model Vocabulary
const userQuiz = require("../models/userQuiz.model"); // import model userQuiz
const userAnswer = require("../models/userAnswer.model"); // import model userQuizAnswer
const user = require("../models/user.model"); // import model user
const { getCurrentTime } = require("../utils/helper");

exports.getAllQuizzes = async (level, search) => {
    const where = {};
    if (level) {
        where.level = level;
    }
    if (search) {
        where.title = {
            [Op.like]: `%${search}%`
        };
    }

    // 1. Lấy danh sách quiz thỏa điều kiện
    const quizzes = await quiz.findAll({
        where,
        order: [["id", "DESC"]],
        raw: true,
    });

    // 2. Lấy tất cả quiz_id để truy vấn câu hỏi
    const quizIds = quizzes.map(q => q.id);

    if (quizIds.length === 0) return [];

    // 3. Lấy tất cả câu hỏi thuộc các quiz đó
    const questions = await quizQuestion.findAll({
        where: { quiz_id: { [Op.in]: quizIds } },
        attributes: ['id', 'quiz_id', 'vocabulary_id', 'order', 'type'],
        raw: true,
    });

    // 4. Lấy tất cả từ vựng liên quan đến các câu hỏi
    const vocabIds = questions.map(q => q.vocabulary_id);
    const vocabs = await Vocab.findAll({
        where: { id: { [Op.in]: vocabIds } },
        attributes: [
            'id',
            'hanzi',
            'meaning',
            'pinyin',
            'example_vi',
            'example_cn',
            'example_pinyin',
            'explain',
        ],
        raw: true,
    });

    // 5. Map từ vựng theo id để dễ lookup
    const vocabMap = vocabs.reduce((acc, vocab) => {
        acc[vocab.id] = vocab;
        return acc;
    }, {});

    // 6. Gắn từ vựng vào câu hỏi
    const questionsWithVocab = questions.map(q => ({
        ...q,
        vocabulary: vocabMap[q.vocabulary_id] || null,
    }));

    // 7. Gom câu hỏi theo quiz_id
    const questionsByQuizId = questionsWithVocab.reduce((acc, q) => {
        if (!acc[q.quiz_id]) acc[q.quiz_id] = [];
        acc[q.quiz_id].push(q);
        return acc;
    }, {});

    // 8. Gắn câu hỏi có từ vựng vào từng quiz
    const quizzesWithQuestions = quizzes.map(q => ({
        ...q,
        questions: questionsByQuizId[q.id] || [],
    }));

    return quizzesWithQuestions;
};


exports.countQuizzes = async (level, search) => {
    const where = {};
    if (level) {
        where.level = level;
    }
    if (search) {
        where.title = {
            [Op.like]: `%${search}%`
        };
    }

    return await quiz.count({ where });
}

exports.createQuiz = async (quizData) => {
    const { title, time, level, num, questions } = quizData;

    // Create the quiz
    const newQuiz = await quiz.create({
        title,
        time,
        level,
        num,
    });
    
    // Create associated questions
    for (const question of questions) {
        await quizQuestion.create({
            quiz_id: newQuiz.id,
            order: question.order,
            vocabulary_id: question.vocabulary_id,
            type: question.type,
        });
    }

    return newQuiz;
}

exports.updateQuiz = async (id, quizData) => {
    const { title, time, level, num, questions } = quizData;

    // Update the quiz
    await quiz.update(
        { title, time, level, num },
        { where: { id } }
    );

    // Update associated questions
    await quizQuestion.destroy({ where: { quiz_id: id } });
    for (const question of questions) {
        await quizQuestion.create({
            quiz_id: id,
            order: question.order,
            vocabulary_id: question.vocabulary_id,
            type: question.type,
        });
    }

    return await quiz.findByPk(id);
}

exports.deleteQuiz = async (id) => {
    // Delete associated questions
    await quizQuestion.destroy({ where: { quiz_id: id } });

    // Delete the quiz
    return await quiz.destroy({ where: { id } });
}

exports.getQuizById = async (id) => {
  // 1. Lấy quiz
  const quizData = await quiz.findByPk(id);
  if (!quizData) return null;

  // 2. Lấy danh sách câu hỏi
  const questions = await quizQuestion.findAll({
    where: { quiz_id: id },
    attributes: ['id', 'vocabulary_id', 'order', 'type'],
    raw: true,
  });

  // 3. Gắn dữ liệu từ vựng & phương án sai
  const questionsWithVocab = await Promise.all(
    questions.map(async (q) => {
      const vocab = await Vocab.findOne({
        where: { id: q.vocabulary_id },
        raw: true,
      });

      if (!vocab) throw new Error("Từ vựng không tồn tại");

      // Lấy các từ cùng level trừ chính nó
      const levelWords = await Vocab.findAll({
        where: {
          level: vocab.level,
          id: { [Op.ne]: vocab.id },
        },
        raw: true,
      });

      // Chọn ngẫu nhiên 3 từ khác để làm đáp án nhiễu
      const distractors = levelWords.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [...distractors, vocab].sort(() => Math.random() - 0.5);

      return {
        ...q,
        vocabulary: {
          ...vocab,
          exampleCn: vocab.example_cn || "",
          exampleVi: vocab.example_vi || "",
          meaningOption: options.map((o) => o.meaning),
          hanziOption: options.map((o) => o.hanzi),
        },
      };
    })
  );

  // 4. Trả về quiz + danh sách câu hỏi
  return {
    ...quizData.dataValues,
    questions: questionsWithVocab,
  };
};

exports.submitQuiz = async (quizId, userId, answers) => {
    // 1. Kiểm tra quiz có tồn tại không
    const quizData = await quiz.findByPk(quizId);
    if (!quizData) throw new Error("Quiz không tồn tại");

    // 2. Lưu kết quả quiz cho người dùng
    const userQuizData = await userQuiz.create({
        user_id: userId,
        quiz_id: quizId,
        score: 0, // sẽ cập nhật sau khi tính điểm
        created_at: getCurrentTime(),
    });

    // 3. Tính điểm và lưu câu trả lời
    let score = 0;
    for (const answer of answers) {
        const { questionId, isCorrect } = answer;

        if (isCorrect) {
            score += 1;
        }

        await userAnswer.create({
            user_id: userId,
            quiz_id: questionId,
            vocabulary_id: 0, // Giả sử questionId là vocabulary_id
            type: 0, // Giả sử type là 0, cần điều chỉnh nếu có loại khác
            is_correct: isCorrect,
        });
    }

    // 4. Cập nhật điểm số cho người dùng
    await userQuiz.update({ score }, { where: { id: userQuizData.id } });

    return {
        userQuizId: userQuizData.id,
        score,
    };
}