CREATE PROCEDURE getPreferredAnswerUserDetails
  @question_id VARCHAR(255)
AS
BEGIN
  SELECT u.Name, u.Email
  FROM users u
  INNER JOIN answers a ON u.userId = a.user_id
  WHERE a.question_id = @question_id AND a.isPreffered = 1
END
