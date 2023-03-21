CREATE OR ALTER PROCEDURE GetUserAnswersWithQuestionAndVotes
    @UserID VARCHAR(255)
AS
BEGIN
    SELECT 
        q.questionID, 
        q.Title AS question_title, 
        q.Body AS question_body,
      
        (
            SELECT 
                a.answer_id,
                a.answer_text,
                a.isPreffered,
             
                (
                    SELECT 
                        vote_type, 
                        COUNT(*) AS vote_count
                    FROM 
                        votes 
                    WHERE 
                        answer_id = a.answer_id 
                    GROUP BY 
                        vote_type 
                    FOR JSON PATH
                ) AS votes
            FROM 
                dbo.answers a 
            WHERE 
                a.question_id = q.questionID 
            FOR JSON PATH
        ) AS answers
    FROM 
        dbo.questions q 
    WHERE 
        q.UserID = @UserID
        AND
        q.isDeleted = 0
    FOR JSON PATH
END

