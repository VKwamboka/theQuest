CREATE PROCEDURE DeleteQuestion
    @QuestionID int
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM questions
    WHERE QuestionID = @questionID;
END