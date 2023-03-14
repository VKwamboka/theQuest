
CREATE OR ALTER  PROCEDURE getProfile(@userId VARCHAR(50))
AS
BEGIN
SELECT userId ,Name ,Email,location, bio, Password FROM users WHERE userId = @userId;
END


EXEC getProfile @userId = 3
DROP PROCEDURE getProfile