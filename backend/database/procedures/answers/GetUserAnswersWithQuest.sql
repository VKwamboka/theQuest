CREATE PROCEDURE GetUserAnswersWithQuestionAndVotes
    @UserID VARCHAR(255)
AS
BEGIN
    SELECT a.answer_id, a.answer_text, q.Title, q.Body, 
        (
            SELECT vote_type, COUNT(*) AS vote_count
            FROM votes
            WHERE answer_id = a.answer_id
            GROUP BY vote_type
            FOR JSON PATH
        ) AS votes
    FROM dbo.answers a
    JOIN dbo.questions q ON q.questionID = a.question_id
    WHERE a.user_id = @UserID
END
