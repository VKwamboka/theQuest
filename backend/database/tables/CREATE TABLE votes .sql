CREATE TABLE votes (
  vote_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  answer_id VARCHAR(255) NOT NULL,
  vote_type VARCHAR(60) NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users(userId),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);


-- ALTER TABLE votes
-- DROP CONSTRAINT fk_votes_users
-- FOREIGN KEY (user_id)
-- REFERENCES users (userId)
-- ON DELETE CASCADE;

-- ALTER TABLE votes
-- ADD CONSTRAINT fk_votes_answers
-- FOREIGN KEY (answer_id)
-- REFERENCES answers (answer_id)
-- ON DELETE CASCADE;

-- ALTER COLUMN vote_type VARCHAR(60) NOT NULL;