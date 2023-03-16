CREATE TABLE answers (
  answer_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  question_id VARCHAR(255) NOT NULL,
  answer_text NVARCHAR(1255) NOT NULL,
  isPreffered BIT NOT NULL DEFAULT 0,
  isSent BIT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  updated_at DATETIME NULL,
  CONSTRAINT FK_Answers_UserID
  FOREIGN KEY (user_id) REFERENCES users(userId),
  FOREIGN KEY (question_id) REFERENCES questions(questionId)
  ON DELETE CASCADE
);

