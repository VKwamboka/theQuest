import express from "express";

import { createVote, getAllVotes,getVoteById } from "../controllers/votes";

const voteRouter = express.Router();

// Vote routes
voteRouter.post("/post-vote", createVote);
voteRouter.get("/getAllVotes", getAllVotes);
voteRouter.get("/getVoteById/:id", getVoteById);


export default voteRouter;