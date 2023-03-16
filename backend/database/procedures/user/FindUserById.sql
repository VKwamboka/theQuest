CREATE PROCEDURE usp_FindUserById
    (@userId VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM users
    WHERE userId = @userId
END

DROP PROCEDURE IF EXISTS usp_FindUserById;