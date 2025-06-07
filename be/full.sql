create table daily_task_log
(
    id           bigint auto_increment
        primary key,
    user_id      bigint        not null,
    task_type    int           not null,
    status       int default 0 null,
    task_date    date          not null,
    number_words int default 0 null,
    updated_at   bigint        null
);

create table learning_progress
(
    id               bigint auto_increment
        primary key,
    user_id          bigint        not null,
    level            int default 1 null,
    learned_words    int default 0 null,
    reviewed_words   int default 0 null,
    mastered_words   int default 0 null,
    current_streak   int default 0 null,
    last_active_date bigint        null
);

create table quiz
(
    id    bigint auto_increment
        primary key,
    title varchar(255) null,
    time  bigint       null,
    level bigint       null,
    num   bigint       null
);

create table quiz_question
(
    id            bigint auto_increment
        primary key,
    quiz_id       bigint not null,
    `order`       int    not null,
    vocabulary_id bigint not null,
    type          bigint not null
);

create table review_log
(
    id            bigint auto_increment
        primary key,
    user_id       bigint     not null,
    vocabulary_id bigint     not null,
    review_time   bigint     null,
    is_correct    tinyint(1) null,
    attempt       int        null
);

create table user
(
    id            bigint auto_increment
        primary key,
    username      varchar(100) not null,
    email         varchar(255) not null,
    password_hash varchar(255) not null,
    created_at    bigint       null,
    last_login    bigint       null,
    constraint email
        unique (email),
    constraint username
        unique (username)
);

create table user_answer
(
    id            bigint auto_increment
        primary key,
    user_id       bigint not null,
    quiz_id       bigint not null,
    vocabulary_id bigint not null,
    type          bigint not null,
    is_correct    bigint not null
);

create table user_quiz
(
    id         bigint auto_increment
        primary key,
    user_id    bigint not null,
    quiz_id    bigint not null,
    score      bigint not null,
    created_at bigint not null
);

create table user_vocabulary
(
    id            bigint auto_increment
        primary key,
    user_id       bigint        not null,
    vocabulary_id bigint        not null,
    status        int default 0 null,
    correct_count int default 0 null,
    last_review   bigint        null,
    next_review   bigint        null,
    created_at    bigint        null
);

create table vocabulary
(
    id             bigint auto_increment
        primary key,
    level          int          not null,
    hanzi          varchar(20)  not null,
    pinyin         varchar(100) null,
    meaning        text         null,
    example_vi     text         null,
    example_cn     text         null,
    example_pinyin text         null,
    `explain`      varchar(255) null
);

