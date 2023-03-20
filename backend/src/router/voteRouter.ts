import express from "express";

import { createVote, getAllVotes,getVoteById } from "../controllers/votes";
import { VerifyToken } from "../middleware/verifyToken";

const voteRouter = express.Router();

// Vote routes
voteRouter.post("/post-vote",VerifyToken, createVote);
voteRouter.get("/getAllVotes", VerifyToken,getAllVotes);
voteRouter.get("/getVoteById/:id", VerifyToken,getVoteById);


export default voteRouter;