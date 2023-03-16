CREATE PROCEDURE UpdateAnswerComment
    @CommentId VARCHAR(255),
    @UserId VARCHAR(255),
    @NewCommentText VARCHAR(1255)
AS
BEGIN
    UPDATE comments
    SET comment_text = @NewCommentText, updated_at = GETDATE()
    WHERE comment_id = @CommentId AND user_id = @UserId;
END
