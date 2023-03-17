CREATE OR ALTER PROCEDURE getPreferredAnswerUserDetails
  -- @question_id VARCHAR(255)
AS
BEGIN
  SELECT u.Name, u.Email, u.userId
  FROM users u
  INNER JOIN answers a ON u.userId = a.user_id
  WHERE  a.isPreffered = 1
END
