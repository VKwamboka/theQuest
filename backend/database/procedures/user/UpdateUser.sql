CREATE PROCEDURE usp_UpdateUser(
    @userId INT,
    @Name NVARCHAR(255) = NULL,
    @Email NVARCHAR(255) = NULL,
    @Password NVARCHAR(255) = NULL,
    @location NVARCHAR(255) = NULL,
    @bio NVARCHAR(1255) = NULL,
    @Role VARCHAR = 'user',
    @isDeleted BIT = 0
)
AS
BEGIN
    UPDATE users
        SET Name = COALESCE(@Name, Name),
        Email = COALESCE(@Email, Email),
        Password = COALESCE(@Password, Password),
        Role = COALESCE(@Role, Role),
        location = COALESCE(@location, location),
        bio = COALESCE(@bio, bio),
        isDeleted = COALESCE(@isDeleted, isDeleted),
        updatedAt = GETDATE()
        WHERE userId = @userId;
    SELECT *
    FROM users
    WHERE userId = @userId;
END

DROP PROCEDURE IF EXISTS usp_UpdateUser;