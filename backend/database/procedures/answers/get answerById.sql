CREATE OR ALTER PROCEDURE findAnswerById
    (@answerID VARCHAR(255))
   
AS
BEGIN
      SELECT *
  FROM answers
  WHERE answer_id = @answerID;
END

