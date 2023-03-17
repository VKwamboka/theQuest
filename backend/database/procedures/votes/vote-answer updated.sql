CREATE OR ALTER PROCEDURE vote_answer
@vote_id VARCHAR(255),
  @user_id VARCHAR(255),
  @answer_id VARCHAR(255),
  @vote_type VARCHAR(60)
AS
BEGIN
  -- Check if the user has already voted on the answer
  DECLARE @existing_vote VARCHAR(60)
  SELECT @existing_vote = vote_type FROM votes
  WHERE user_id = @user_id AND answer_id = @answer_id

  IF @existing_vote IS NOT NULL
  BEGIN
    -- If the user has already voted with the same vote type, do nothing
    IF @existing_vote = @vote_type
    BEGIN
      RETURN
    END
    -- If the user clicked a different vote type, update their vote
    ELSE
    BEGIN
      UPDATE votes
      SET vote_type = @vote_type
      WHERE user_id = @user_id AND answer_id = @answer_id
    END
  END
  -- If the user has not voted yet, insert a new vote
  ELSE
  BEGIN
    INSERT INTO votes (vote_id, user_id, answer_id, vote_type)
    VALUES (@vote_id, @user_id, @answer_id, @vote_type)
  END
END
