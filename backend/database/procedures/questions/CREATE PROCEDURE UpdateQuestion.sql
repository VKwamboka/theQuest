CREATE OR ALTER PROCEDURE UpdateQuestion
    @QuestionID VARCHAR(255),
    @Title VARCHAR(255),
    @Body VARCHAR(1255),
    @Code VARCHAR(1255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE questions
    SET Title = @Title, Body = @Body, Code = @Code
    WHERE QuestionID = @QuestionID;
    -- SELECT * FROM questions WHERE QuestionID = @QuestionID;
END

-- DROP PROCEDURE IF EXISTS UpdateQuestion;