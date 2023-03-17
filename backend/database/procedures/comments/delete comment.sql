-- CREATE OR ALTER PROCEDURE DeleteAnswerComment
-- @comment_id VARCHAR(255),
-- @user_id VARCHAR(255)
-- AS
-- BEGIN
-- IF EXISTS (SELECT * FROM comments WHERE comment_id = @comment_id AND user_id = @user_id)
-- BEGIN
-- DELETE FROM comments
-- WHERE comment_id = @comment_id AND user_id = @user_id;
-- END
-- ELSE
-- BEGIN
-- RAISERROR('You are not authorized to delete this comment .', 16, 1);
-- END
-- END

CREATE OR ALTER PROCEDURE DeleteAnswerComment
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255)
  
AS
BEGIN
    IF NOT EXISTS(SELECT comment_id  FROM comments WHERE comment_id=@comment_id  AND user_id = @user_id)
    BEGIN
        RAISERROR('You cannot delete a comment that you did not post', 16, 1)
        RETURN
    END
   

    DELETE FROM comments WHERE comment_id = @comment_id AND user_id = @user_id

    SELECT 'Comment deleted successfully' AS Message
END