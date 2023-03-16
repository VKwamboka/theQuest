-- CREATE OR ALTER PROCEDURE DeleteAnswer
--      @answer_id VARCHAR(255)
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     DELETE FROM answers
--     WHERE  answer_id =  @answer_id;
-- END

CREATE PROCEDURE DeleteAnswerByUser

    @user_id VARCHAR(255),
    @answer_id VARCHAR(255)
AS
BEGIN
    IF NOT EXISTS(SELECT answer_id  FROM answers WHERE answer_id  = @answer_id  AND user_id = @user_id)
    BEGIN
        RAISERROR('You cannot delete an answer that you did not post', 16, 1)
        RETURN
    END
    
    DELETE FROM answers WHERE answer_id  = @answer_id 

    SELECT 'Answer deleted successfully' AS Message
END
