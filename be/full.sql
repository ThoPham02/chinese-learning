CREATE TABLE `user` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at BIGINT,
    last_login BIGINT
);

CREATE TABLE vocabulary (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    level INT NOT NULL CHECK (level BETWEEN 1 AND 6),
    hanzi VARCHAR(20) NOT NULL,
    pinyin VARCHAR(100),
    meaning TEXT,
    example_vi TEXT,
    example_cn TEXT,
    audio_url VARCHAR(255)
);

CREATE TABLE user_vocabulary (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    vocabulary_id BIGINT NOT NULL,
    status INT DEFAULT 0 CHECK (status BETWEEN 0 AND 3), -- 0: new, 1: learning, 2: mastered, 3: archived
    correct_count INT DEFAULT 0,
    last_review BIGINT,
    next_review BIGINT,
    created_at BIGINT
);

CREATE TABLE review_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    vocabulary_id BIGINT NOT NULL,
    review_time BIGINT,
    is_correct BOOLEAN,
    attempt INT
);

CREATE TABLE quiz (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    score FLOAT,
    created_at BIGINT
);

CREATE TABLE quiz_question (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    vocabulary_id BIGINT,
    is_correct BOOLEAN
);

CREATE TABLE quiz_answer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN
);

CREATE TABLE learning_progress (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    learned_words INT DEFAULT 0,
    reviewed_words INT DEFAULT 0,
    mastered_words INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    last_active_date BIGINT
);

CREATE TABLE daily_task_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    task_type INT NOT NULL,
    status INT DEFAULT 0,
    task_date DATE NOT NULL,
    updated_at BIGINT
);