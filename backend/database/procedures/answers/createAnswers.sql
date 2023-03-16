-- Create a new stored procedure called 'createAnswer' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'createAnswer'
)
DROP PROCEDURE dbo.createAnswer
GO
-- Create the stored procedure in the specified schema
CREATE OR ALTER PROCEDURE dbo.createAnswer 
 @answer_id VARCHAR(255),
  @user_id VARCHAR(255),
    @question_id VARCHAR(255),
    @answer_text NVARCHAR(1255),
    @created_at DATETIME,
    @updated_at DATETIME
AS
  BEGIN
  INSERT INTO answers (answer_id, user_id, question_id, answer_text, created_at, updated_at)
  VALUES (@answer_id,  @user_id, @question_id, @answer_text, @created_at, @updated_at);
END;
GO

-- SELECT * FROM answers

-- DROP PROCEDURE IF EXISTS createAnswer;

-- EXECUTE createAnswer 'How to create a stored procedure?', 'I want to learn how to create a stored procedure in mssql.', '6eee788f-69a3-4e68-9037-12c44b901374', '101','nmbvcfg';