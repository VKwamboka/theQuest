CREATE PROCEDURE GetAllUsers
AS
BEGIN
    SELECT userId, Name, Email, Role, isDeleted, createdAt, updatedAt
    FROM users
    WHERE isDeleted = 0;
END