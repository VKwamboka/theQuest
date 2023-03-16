CREATE OR ALTER PROCEDURE findAnswerById
    (@answer_id  VARCHAR(255))
   
AS
BEGIN
      SELECT *
  FROM answers
  WHERE answer_id  = @answer_id;
  
END

