-- CREATE PROCEDURE GetAllQuestions
-- AS
-- BEGIN
--     SELECT *
--     FROM questions
--     WHERE isDeleted = 0;
-- END


-- CREATE OR ALTER PROCEDURE GetAllQuestions
CREATE OR ALTER PROCEDURE GetAllQuestions
    @pageNumber int,
    @pageSize int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT q.*, u.Name AS Name
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY QuestionID) AS RowNum, *
        FROM questions
        WHERE isDeleted = 0
    ) AS q
    JOIN users AS u ON q.UserID = u.userId
    WHERE q.RowNum >= (@pageNumber - 1) * @pageSize + 1
    AND q.RowNum <= @pageNumber * @pageSize
    ORDER BY q.RowNum
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