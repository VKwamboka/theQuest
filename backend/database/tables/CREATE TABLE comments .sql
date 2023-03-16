CREATE TABLE comments (
  comment_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  answer_id VARCHAR(255) NOT NULL,
  comment_text VARCHAR(1255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  updated_at DATETIME NULL,
  CONSTRAINT FK_Comments_Users 
  FOREIGN KEY (user_id) REFERENCES users(userId),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id )
   on delete cascade
);

