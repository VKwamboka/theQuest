CREATE OR ALTER PROCEDURE findVoteById
    (@vote_id VARCHAR(255)) 
AS
BEGIN
      SELECT *
  FROM votes
  WHERE vote_id = @vote_id;
END

