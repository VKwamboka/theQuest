-- CREATE PROCEDURE FetchFullQuestion
--     @questionID varchar(255)
-- AS
-- BEGIN
--     SELECT 
--         q.questionID, 
--         q.Title, 
--         q.Body, 
--         q.UserID, 
--         a.answer_id, 
--         a.answer_text, 
--         a.user_id AS answer_user_id, 
--         c.comment_id, 
--         c.comment_text, 
--         c.user_id AS comment_user_id, 
--         v.vote_id, 
--         v.vote_type, 
--         v.user_id AS vote_user_id
--     FROM questions q
--     LEFT JOIN answers a ON q.questionID = a.question_id
--     LEFT JOIN comments c ON a.answer_id = c.answer_id
--     LEFT JOIN votes v ON a.answer_id = v.answer_id
--     WHERE q.questionID = @questionID
-- END


-- array form
-- CREATE OR ALTER PROCEDURE FetchFullQuestion
--     @questionID varchar(255)
-- AS
-- BEGIN
--     SELECT
--         q.questionID,
--         q.Title,
--         q.Body,
--         q.UserID,
--         q.QuestionDate,
--         JSON_QUERY((
--             SELECT
--                 a.answer_id,
--                 a.user_id,
--                 a.answer_text,
--                 a.isPreffered,
--                 a.isSent,
--                 a.created_at,
--                 a.updated_at,
--                 JSON_QUERY((
--                     SELECT
--                         c.comment_id,
--                         c.user_id,
--                         c.comment_text,
--                         c.created_at,
--                         c.updated_at
--                     FROM comments c
--                     WHERE c.answer_id = a.answer_id
--                     FOR JSON PATH
--                 )) AS comments,
--                 JSON_QUERY((
--                     SELECT
--                         v.vote_id,
--                         v.user_id,
--                         v.vote_type,
--                         v.created_at
--                     FROM votes v
--                     WHERE v.answer_id = a.answer_id
--                     FOR JSON PATH
--                 )) AS votes
--             FROM answers a
--             WHERE a.question_id = q.questionID
--             FOR JSON PATH
--         )) AS answers
--     FROM questions q
--     WHERE q.questionID = @questionID
-- END

CREATE OR ALTER PROCEDURE FetchFullQuestion
    @questionID VARCHAR(255)
AS
BEGIN
    SELECT q.questionID, q.Title, q.Body, q.Code, u.Name AS UserName, u.location AS UserLocation,
           u.bio AS UserBio, q.QuestionDate,
           JSON_QUERY((SELECT a.answer_id, a.user_id,u.Name AS UserName, a.answer_text, a.isPreffered, a.created_at AS AnswerDate,
                               (SELECT vote_type, user_id FROM votes WHERE answer_id = a.answer_id FOR JSON PATH) AS Votes,
                               (SELECT comment_id, user_id, comment_text, created_at AS CommentDate 
                                FROM comments WHERE answer_id = a.answer_id FOR JSON PATH) AS Comments
                        FROM answers AS a WHERE a.question_id = q.questionID FOR JSON PATH)) AS Answers
    FROM questions AS q
    JOIN users AS u ON q.UserID = u.userId
    WHERE q.questionID = @questionID;
END
