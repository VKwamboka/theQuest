
CREATE PROCEDURE DeleteUserCompletely
    (@userId INT)
AS
BEGIN
    DELETE 
    FROM users
    WHERE userId = @userId
END