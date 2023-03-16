CREATE PROCEDURE MarkAnswerAsPreferred
    @user_id int,
    @answer_id int
AS
BEGIN
    IF NOT EXISTS(SELECT questionID FROM questions WHERE questionID = (SELECT question_id FROM answers WHERE answer_id = @answer_id) AND UserID = @user_id)
    BEGIN
        RAISERROR('You cannot mark an answer as preferred for a question that you did not post', 16, 1)
        RETURN
    END
    
    UPDATE Answers
    SET isPreffered  = CASE 
                            WHEN answer_id= @answer_id THEN 1
                            ELSE 0
                        END
    WHERE question_id = (SELECT question_id FROM answers WHERE answer_id = @answer_id)

    SELECT 'Answer marked as preferred successfully' AS Message
END
