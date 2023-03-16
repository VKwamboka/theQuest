CREATE PROCEDURE usp_UpdateAnswer(
    @answer_id VARCHAR(255),
    @user_id VARCHAR(255),
    @question_id VARCHAR(255),
    @answer_text NVARCHAR(1255)

)
AS
BEGIN
    BEGIN
    SET NOCOUNT ON;

    UPDATE answers
    SET answer_text = @answer_text
    WHERE answer_id= @answer_id 
    -- SELECT * FROM questions WHERE QuestionID = @QuestionID;
END

END

