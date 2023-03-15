CREATE PROCEDURE usp_FindQuestionById
    (@question_id VARCHAR(255))
AS
BEGIN
      SELECT *
  FROM questions
  WHERE questionId = @question_id;
END

