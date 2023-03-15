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
CREATE PROCEDURE dbo.createQuestion
   @Title varchar(255),
  @Body text,
  @UserID VARCHAR(255),
  @Code text,
  
  @questionID VARCHAR
AS
  BEGIN
  INSERT INTO questions (Title, Body, UserID, questionID,Code,QuestionDate)
  VALUES (@Title, @Body, @UserID, @QuestionID, @Code,GETDATE());
END;
GO

EXECUTE createQuestion 'How to create a stored procedure?', 'I want to learn how to create a stored procedure in mssql.', '6eee788f-69a3-4e68-9037-12c44b901374', '101','nmbvcfg';