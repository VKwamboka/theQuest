CREATE OR ALTER PROCEDURE DeleteQuestion
    @QuestionID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM questions
    WHERE QuestionID = @questionID;
END