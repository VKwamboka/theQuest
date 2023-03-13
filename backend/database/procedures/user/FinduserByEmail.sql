
CREATE PROCEDURE usp_FindUserByEmail
    (@Email VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM users
    WHERE Email = @Email
END