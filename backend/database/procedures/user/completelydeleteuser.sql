
CREATE OR ALTER PROCEDURE DeleteUserCompletely
    (@userId VARCHAR(255))
AS
BEGIN
    DELETE 
    FROM users
    WHERE userId = @userId
END