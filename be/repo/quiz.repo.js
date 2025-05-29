const { Op } = require("sequelize"); // đảm bảo bạn đã import Op
const quiz = require("../models/quiz.model"); // import model quiz
const quizQuestion = require("../models/quizQuestion.model"); // import model quizQuestion
const Vocab = require("../models/vocab.model"); // import model Vocabulary
const userQuiz = require("../models/userQuiz.model"); // import model userQuiz
const userAnswer = require("../models/userAnswer.model"); // import model userQuizAnswer
const user = require("../models/user.model"); // import model user

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

  // 2. Lấy câu hỏi của quiz
  const questions = await quizQuestion.findAll({
    where: { quiz_id: id },
    attributes: ['id', 'vocabulary_id', 'order', 'type'],
  });

  const vocabIds = questions.map(q => q.vocabulary_id);

  // 3. Lấy từ vựng tương ứng
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

  // 4. Gắn thông tin từ vựng vào câu hỏi
  const questionsWithVocab = questions.map(q => {
    const vocab = vocabs.find(v => v.id === q.vocabulary_id);
    return {
      ...q.dataValues,
      vocabulary: vocab || null,
    };
  });

  // 5. Trả về quiz kèm câu hỏi
  return {
    ...quizData.dataValues,
    questions: questionsWithVocab,
  };
};

