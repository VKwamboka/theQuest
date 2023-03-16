CREATE PROCEDURE GetAllQuestions
AS
BEGIN
    SELECT *
    FROM questions
    WHERE isDeleted = 0;
END



-- CREATE PROCEDURE GetAllQuestions
-- AS
-- BEGIN
--     SELECT q.QuestionId, q.UserId, q.QuestionTitle, q.QuestionBody, q.QuestionDate,
--            STRING_AGG(t.TagName, ',') AS Tags
--     FROM Questions q
--     LEFT JOIN QuestionTags qt ON q.QuestionId = qt.QuestionId
--     LEFT JOIN Tags t ON qt.TagId = t.TagId
--     GROUP BY q.QuestionId, q.UserId, q.QuestionTitle, q.QuestionBody, q.QuestionDate
--     ORDER BY q.QuestionDate DESC;
-- END