-- Create a new stored procedure called 'registerUser' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'registerUser'
)
DROP PROCEDURE dbo.registerUser
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.registerUser
    @userId VARCHAR(255),
    @Name VARCHAR(255),
    @Email VARCHAR(255),
    @Password VARCHAR(255)
    
    AS

BEGIN
    INSERT INTO users
        (userId, Name, Email, Password )
    VALUES
        (@userId,@Name, @Email, @Password);

    SELECT *
    FROM users
    WHERE email = @email;
END