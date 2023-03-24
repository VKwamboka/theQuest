CREATE OR ALTER PROCEDURE DeleteQuestion
    @QuestionID VARCHAR(255)
AS
BEGIN 
    SET NOCOUNT ON;

     DELETE FROM comments WHERE answer_id IN (SELECT answer_id FROM answers WHERE question_id = @questionId);

      DELETE FROM answers WHERE question_id = @questionId;

    DELETE FROM questions
    WHERE QuestionID = @questionID;
END