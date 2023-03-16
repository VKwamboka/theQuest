CREATE PROCEDURE DeleteAnswerComment
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255)
AS
BEGIN
    DELETE FROM comments
    WHERE comment_id = @comment_id AND user_id = @user_id;
END
