CREATE PROCEDURE UpdateQuestion
    @QuestionID VARCHAR,
    @Title VARCHAR,
    @Body VARCHAR,
    @Code VARCHAR
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE questions
    SET Title = @Title, Body = @Body, Code = @Code
    WHERE QuestionID = @QuestionID;
END

DROP PROCEDURE IF EXISTS UpdateQuestion;