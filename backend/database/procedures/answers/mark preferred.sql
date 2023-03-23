CREATE OR ALTER PROCEDURE MarkAnswerAsPreferred
    @user_id  VARCHAR(255),
    @answer_id VARCHAR(255)
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

EXECUTE MarkAnswerAsPreferred '509d340a-4f74-49f4-8b42-343707c4f3e7', '944f0bbb-5e2a-412e-9ec5-ac570366e01d'