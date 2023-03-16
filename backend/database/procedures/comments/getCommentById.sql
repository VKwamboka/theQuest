CREATE OR ALTER PROCEDURE findCommentById
    (@comment_id  VARCHAR(255))
    
   
AS
BEGIN
      SELECT *
  FROM comments
  WHERE comment_id = @comment_id ;
 
END

