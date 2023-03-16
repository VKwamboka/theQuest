CREATE PROCEDURE DeleteVote
    @vote_id VARCHAR(255)
AS
BEGIN
    DELETE FROM votes
    WHERE vote_id = @vote_id
END
