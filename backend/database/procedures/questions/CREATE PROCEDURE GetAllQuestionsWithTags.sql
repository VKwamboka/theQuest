CREATE PROCEDURE GetAllQuestionsWithTags
AS
BEGIN
    SELECT q.QuestionId, q.UserId, q.Title, q.Body, q.QuestionDate,q.Code
    FROM questions q
    LEFT JOIN QuestionTags qt ON q.QuestionId = qt.questionId
    LEFT JOIN Tags t ON qt.TagId = t.TagId
    GROUP BY q.QuestionId, q.UserId, q.Title, q.Body, q.Code, q.QuestionDate
    ORDER BY q.QuestionDate DESC;
END