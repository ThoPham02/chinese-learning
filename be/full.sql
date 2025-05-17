CREATE TABLE `user` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

CREATE TABLE vocabulary (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    level INT NOT NULL CHECK (level BETWEEN 1 AND 6),
    hanzi VARCHAR(20) NOT NULL,
    pinyin VARCHAR(100),
    meaning_vi TEXT,
    example_vi TEXT,
    audio_url VARCHAR(255)
);

CREATE TABLE user_vocabulary (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    vocabulary_id BIGINT NOT NULL,
    status ENUM('new', 'learning', 'reviewing', 'mastered') DEFAULT 'learning',
    correct_count INT DEFAULT 0,
    last_review DATE,
    next_review DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id),
    UNIQUE (user_id, vocabulary_id)
);

CREATE TABLE review_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    vocabulary_id BIGINT NOT NULL,
    review_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_correct BOOLEAN,
    attempt INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id)
);

CREATE TABLE quiz (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    score FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE quiz_question (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    vocabulary_id BIGINT,
    is_correct BOOLEAN,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id)
);

CREATE TABLE quiz_answer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES quiz_question(id)
);

CREATE TABLE learning_progress (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    learned_words INT DEFAULT 0,
    reviewed_words INT DEFAULT 0,
    mastered_words INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    last_active_date DATE,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
