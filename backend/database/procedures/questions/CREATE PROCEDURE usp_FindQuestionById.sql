CREATE OR ALTER PROCEDURE usp_FindQuestionById
    (@questionID VARCHAR(255))
AS
BEGIN
      SELECT *
  FROM questions
  WHERE questionId = @questionID;
END

