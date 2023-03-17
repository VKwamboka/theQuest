-- CREATE PROCEDURE InsertVote
--     @user_id VARCHAR(255),
--     @answer_id VARCHAR(255),
--     @vote_type VARCHAR(60)
-- AS
-- BEGIN
--     DECLARE @vote_id VARCHAR(255)
--     SET @vote_id = NEWID()

--     INSERT INTO votes (vote_id, user_id, answer_id, vote_type)
--     VALUES (@vote_id, @user_id, @answer_id, @vote_type)
-- END


-- EXEC InsertVote @UserId = '123', @AnswerId = '456', @VoteType = 'upvote'


CREATE PROCEDURE InsertVote
    @user_id VARCHAR(255),
    @answer_id VARCHAR(255),
    @vote_type VARCHAR(60)
AS
BEGIN
    DECLARE @vote_id VARCHAR(255)
    SET @vote_id = NEWID()

    -- Check if the user has already voted on this answer
    IF EXISTS (SELECT * FROM votes WHERE user_id = @user_id AND answer_id = @answer_id)
    BEGIN
        -- Update existing vote
        UPDATE votes SET vote_type = @vote_type WHERE user_id = @user_id AND answer_id = @answer_id
        IF @@ROWCOUNT = 0
        BEGIN
            -- If the update statement did not modify any rows, the user has not yet voted on the answer
            RAISERROR('The user has not yet voted on this answer', 16, 1)
        END
    END
    ELSE
    BEGIN
        -- Insert new vote
        INSERT INTO votes (vote_id, user_id, answer_id, vote_type)
        VALUES (@vote_id, @user_id, @answer_id, @vote_type)
        IF @@ROWCOUNT = 0
        BEGIN
            -- If the insert statement did not modify any rows, there was an error inserting the vote
            RAISERROR('Error inserting vote', 16, 1)
        END
    END
END
