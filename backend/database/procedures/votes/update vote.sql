CREATE OR ALTER PROCEDURE UpdateVote
    @vote_id VARCHAR(255),
    @vote_type VARCHAR(60)
AS
BEGIN
    UPDATE votes
    SET vote_type = CASE WHEN vote_type = 'upvote' THEN 'downvote' ELSE 'upvote' END
    WHERE vote_id = @vote_id AND vote_type != @vote_type
END
