
CREATE OR ALTER PROCEDURE deleteUser(@userId VARCHAR(50))
AS
BEGIN
UPDATE users SET isDeleted='1' WHERE userId=@userId
END
GO

