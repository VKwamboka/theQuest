-- Create a new stored procedure called 'createQuestion' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'createQuestion'
)
DROP PROCEDURE dbo.createQuestion
GO
-- Create the stored procedure in the specified schema
CREATE OR ALTER PROCEDURE dbo.createQuestion
   @Title varchar(255),
  @Body VARCHAR(1255),
  @UserID VARCHAR(255),
  @Code VARCHAR(1255),
  @QuestionDate DATETIME,
  @questionID VARCHAR(255)
AS
  BEGIN
  INSERT INTO questions (Title, Body, UserID, questionID,Code,QuestionDate)
  VALUES (@Title, @Body, @UserID, @questionID,@Code, @QuestionDate);
END;
GO

SELECT * FROM questions

-- DROP PROCEDURE IF EXISTS createQuestion;

-- EXECUTE createQuestion 'How to create a stored procedure?', 'I want to learn how to create a stored procedure in mssql.', '6eee788f-69a3-4e68-9037-12c44b901374', '101','nmbvcfg';