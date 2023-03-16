-- Create a new table called 'questions' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.questions', 'U') IS NOT NULL
DROP TABLE dbo.questions
GO
-- Create the table in the specified schema
CREATE TABLE dbo.questions
(
    questionID varchar(255) PRIMARY KEY NOT NULL,
  Title varchar(255),
  Body VARCHAR(1255),
  UserID VARCHAR(255),
  Code VARCHAR(1255),
   isDeleted BIT NOT NULL DEFAULT 0,
  QuestionDate DATETIME,

  CONSTRAINT FK_Questions_UserID
  FOREIGN KEY (UserID) REFERENCES users(userId)
  ON DELETE CASCADE
);
GO