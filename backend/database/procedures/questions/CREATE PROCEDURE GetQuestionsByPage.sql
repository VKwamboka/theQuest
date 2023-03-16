CREATE PROCEDURE GetQuestionsByPage
    @PageNumber int,
    @PageSize int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY QuestionID) AS RowNum, *
        FROM questions
    ) AS RowConstrainedResult
    WHERE RowNum >= (@PageNumber - 1) * @PageSize + 1
    AND RowNum <= @PageNumber * @PageSize
    ORDER BY RowNum
END