CREATE PROCEDURE InsertVote
    @user_id VARCHAR(255),
    @answer_id VARCHAR(255),
    @vote_type VARCHAR(60)
AS
BEGIN
    DECLARE @vote_id VARCHAR(255)
    SET @vote_id = NEWID()

    INSERT INTO votes (vote_id, user_id, answer_id, vote_type)
    VALUES (@vote_id, @user_id, @answer_id, @vote_type)
END


-- EXEC InsertVote @UserId = '123', @AnswerId = '456', @VoteType = 'upvote'
