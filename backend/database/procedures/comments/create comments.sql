CREATE OR ALTER PROCEDURE CreateAnswerComment
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255),
    @answer_id VARCHAR(255),
    @comment_text VARCHAR(1255)
AS
BEGIN
    INSERT INTO comments (comment_id, user_id, answer_id, comment_text)
    VALUES (@comment_id, @user_id, @answer_id, @comment_text);
END
