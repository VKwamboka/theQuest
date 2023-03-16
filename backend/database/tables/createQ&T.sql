CREATE TABLE QuestionTags (
    QuestionId VARCHAR(255) NOT NULL,
    TagId VARCHAR(255) NOT NULL,
    PRIMARY KEY (QuestionId, TagId),
    FOREIGN KEY (QuestionId) REFERENCES questions(questionId),
    FOREIGN KEY (TagId) REFERENCES Tags(TagId)
);

DROP TABLE QuestionTags;