CREATE PROCEDURE GetUserQuestions
    @UserID VARCHAR(255)
AS
BEGIN
    SELECT questionID, Title, Body, Code, isDeleted, QuestionDate
    FROM dbo.questions
    WHERE UserID = @UserID
END
