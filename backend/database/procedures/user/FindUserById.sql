CREATE PROCEDURE usp_FindUserById
    (@userId INT)
AS
BEGIN
    SELECT *
    FROM users
    WHERE userId = @userId
END