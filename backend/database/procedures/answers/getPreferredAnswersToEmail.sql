CREATE PROCEDURE getPreferredAnswersToSendEmailFor
AS
BEGIN
    SELECT * FROM answers
    WHERE isPreffered = 1 AND isSent = 0
END
