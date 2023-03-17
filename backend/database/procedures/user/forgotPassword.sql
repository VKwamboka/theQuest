CREATE PROCEDURE forgotPassword 
    @Email VARCHAR(300)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @userId VARCHAR(255);

    -- get the user id of the user with the given email
    SELECT @userId = userId FROM dbo.users WHERE Email = @Email;

    IF (@userId IS NOT NULL)
    BEGIN
        -- set forgetPassword value to 1
        UPDATE dbo.users SET forgetPassword = 1 WHERE userId = @userId;
    END
END
